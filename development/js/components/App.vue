<template>
    <div id="dungeons_and_dragons__character_sheet" class="pseudo-body">
        <app-navigation></app-navigation>

        <main role="main" v-if="!loading">
            <app-introduction
                    :intro="view__introduction"
                    :intro_msg_1="message__introduction_1"
                    :intro_msg_2="message__introduction_2"
                    :intro_msg_2_list="message__introduction_2_list">
            </app-introduction>

            <app-dashboard :user="character"></app-dashboard>

            <button class="button button_intro-toggle" v-on:click="view__introduction = !view__introduction">
                <span>
                    <span v-if="view__introduction">Hide</span>
                    <span v-else>Show</span>
                </span> Introduction
            </button>
        </main>

        <app-footer></app-footer>
    </div>
</template>

<script>
    import Vue from "vue"

    export default {
        name: 'app',
        data() {
            return {
                loading: true,
                view__introduction: false,
                message__introduction_1: "Broadly speaking, this is the front-end of a service to manage Dungeons and Dragons character sheets.",
                message__introduction_2: "<strong>More specifically,</strong> this is the front-end of a service to manage Dungeons and Dragons character information. This includes, but will not be limited to:",
                message__introduction_2_list: [ "Stats", "Name", "Alignment", "Inventory", "Experience", "Saving throws" ],
                character: []
            }
        },
        mounted() {
            this.fetch_user_data()

            Vue.filter('capitalize', string => string.charAt(0).toUpperCase() + string.slice(1))
            Vue.filter('lowercase',  string => string.toLowerCase())
            Vue.filter('oxford_comma', array => {
                let string = ""

                array.map(item => string += `${array[0] === item ? `${item}` : array[array.length - 1] === item ? `, and ${item}` : `, ${item}`}`)

                return string
            })
        },
        methods: {
            fetch_user_data() {
                fetch(`./data/character_sheet__player_name.json`)
                    .then(response => response.json())
                    .then(data => {
                        this.character = data[0]

                        this.loading = false
                    })
            }
        },
        components: [ "app-navigation", "app-introduction", "app-footer" ]
    }
</script>