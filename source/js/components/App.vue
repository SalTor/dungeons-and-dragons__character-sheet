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
            bus.$on('spell-slot::regain', this.regainSpellSlot)
            bus.$on('spell-slot::expend', this.expendSpellSlot)
            bus.$on('spell-slot::reset',  this.resetSpellSlot)
        },
        mounted() {
            this.fetch_user_data()
        },
        data() {
            return {
                character: {
                    death_saves: { pass: 0, fail: 0 },
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
            updateCoins(new_coins) {
                const { copper, silver, electrum, gold, platinum } = new_coins

                this.character.coin_pouch = { copper, silver, electrum, gold, platinum }
            },
            resetDSP() {
                this.character.death_saves.pass = 0
            },
            resetDSF() {
                this.character.death_saves.fail = 0
            },
            increaseDSP() {
                if(this.character.death_saves.pass + 1 <= 3) {
                    this.character.death_saves.pass++
                }
            },
            increaseDSF() {
                if(this.character.death_saves.fail + 1 <= 3) {
                    this.character.death_saves.fail++
                }
            },
            updateItem(details) {
                const { name, amount, price, notes, id } = details

                const current_item = this.character.inventory.filter(({ id: d }) => d === id)[0]
                current_item.name = name
                current_item.amount = amount
                current_item.price = price
                current_item.notes = notes
            }
            , createItem(details) { this.character.inventory.push(details) }
            , deleteItem(id) { this.character.inventory = this.character.inventory.filter(i => i.id !== id) }
            , regainSpellSlot(level) { this.character.spell_book.spells[level].slots.expended-- }
            , expendSpellSlot(level) { this.character.spell_book.spells[level].slots.expended++ }
            , resetSpellSlot(level) { this.character.spell_book.spells[level].slots.expended = 0 }
        }
    }
</script>