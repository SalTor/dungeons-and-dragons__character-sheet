<template>
    <div id="dungeons_and_dragons__character_sheet" class="pseudo-body">
        <app-navigation></app-navigation>

        <router-view :user="character" />

        <app-footer></app-footer>
    </div>
</template>

<script>
    import { bus } from '../dungeons_and_dragons_character_sheet'
    import Vue from 'vue'
    import Navigation from './Navigation.vue'
    import Footer from './Footer.vue'

    require('promise-polyfill')
    require('fetch-ie8')

    Vue.component('app-navigation', Navigation)
    Vue.component('app-footer', Footer)

    // Filters
    Vue.filter('number', entry => entry.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
    Vue.filter('sign', number => number >= 0 ? `+${ number }` : `${ number }`)

    // Directives
    Vue.directive('focus', { inserted: el => el.focus() })

    export default {
        name: 'app',
        created() {
            Vue.filter('modifier', saving_throw => {
                if(this.character.hasOwnProperty('saving_throw_modifiers')) {
                    return this.character.saving_throw_modifiers[saving_throw]
                }
            })

            bus.$on('coin-pouch:update', this.updateCoins)
            bus.$on('item:create', this.createItem)
            bus.$on('item:update', this.updateItem)
            bus.$on('item:delete', this.deleteItem)
            bus.$on('death-saves::reset-pass', this.resetDSP)
            bus.$on('death-saves::reset-fail', this.resetDSF)
            bus.$on('death-saves::pass', this.increaseDSP)
            bus.$on('death-saves::fail', this.increaseDSF)
        },
        mounted() {
            this.fetch_user_data()
        },
        data() {
            return {
                character: {
                    death_saves: [ 0, 0 ],
                    hitpoints: { temp: 10 },
                    inventory: null,
                    coin_pouch: null
                }
            }
        },
        methods: {
            fetch_user_data() {
                fetch('./data/character_sheet__player_name.json')
                    .then(response => response.json())
                    .then(data => this.character = data[0])
            },
            createItem(details) { this.character.inventory.push(details) },
            deleteItem(id) { this.character.inventory = this.character.inventory.filter(i => i.id !== id) },
            updateItem(details) {
                const { name, amount, price, notes, id } = details

                const current_item = this.character.inventory.filter(({ id: d }) => d === id)[0]
                current_item.name = name
                current_item.amount = amount
                current_item.price = price
                current_item.notes = notes
            },
            updateCoins(new_coins) {
                const { copper, silver, electrum, gold, platinum } = new_coins

                this.character.coin_pouch = { copper, silver, electrum, gold, platinum }
            },
            resetDSP() {
                const [ , fail ] = this.character.death_saves
                this.character.death_saves = [ 0, fail ]
            },
            resetDSF() {
                const [ pass, ] = this.character.death_saves
                this.character.death_saves = [ pass, 0 ]
            },
            increaseDSP() {
                if(this.character.death_saves[0] + 1 <= 3) {
                    const [ pass, fail ] = this.character.death_saves
                    this.character.death_saves = [ pass + 1, fail ]
                }
            },
            increaseDSF() {
                if(this.character.death_saves[1] + 1 <= 3) {
                    const [ pass, fail ] = this.character.death_saves
                    this.character.death_saves = [ pass, fail +1 ]
                }
            }
        }
    }
</script>