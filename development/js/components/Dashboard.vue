<template>
    <main role="main">
        <section>
            <div class="section__content"></div>
        </section>
    </main>
</template>

<script>
    import Vue from "vue"

    export default {
        name: "app-dashboard",
        data() {
            return {
                character: [],
                loading: true
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
        }
    }
</script>
