<template>
    <div id="dungeons_and_dragons__character_sheet" class="pseudo-body">
        <app-navigation></app-navigation>

        <router-view :user="character"></router-view>

        <app-footer></app-footer>
    </div>
</template>

<script>
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
    Vue.filter('modifier', saving_throw => this.character.saving_throw_modifiers[saving_throw])

    // Directives
    Vue.directive('focus', {
        inserted: el => el.focus()
    })

    export default {
        name: 'app',
        mounted() {
            this.fetch_user_data()
        },
        data() {
            return {
                character: {
                    death_saves: [ 0, 0 ],
                    hitpoints: {
                        temp: 10
                    }
                },
                loading: true
            }
        },
        methods: {
            fetch_user_data() {
                fetch('./data/character_sheet__player_name.json')
                    .then(response => response.json())
                    .then(data => {
                        this.character = data[0]

                        this.loading = false
                    })
            }
        }
    }
</script>