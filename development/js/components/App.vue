<template>
    <div id="dungeons_and_dragons__character_sheet" class="pseudo-body">
        <app-navigation></app-navigation>

        <router-view :user="character"></router-view>

        <app-footer></app-footer>
    </div>
</template>

<script>
    import Vue from "vue"
    require("promise-polyfill")
    require("fetch-ie8")

    export default {
        name: 'app',
        mounted() {
            this.fetch_user_data()
        },
        data() {
            return {
                character: [],
                loading: true
            }
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
        }
    }
</script>