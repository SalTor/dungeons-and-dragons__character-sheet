<template>
    <main role="main">
        <section>
            <div class="section__content">
                <h1 class="section__header">Dashboard</h1>
            </div>
        </section>

        <section>
            <div class="section__content">
                <div class="field-wrapper field-wrapper_direction_vertical">
                    <label for="character-name" class="input__label">Character Name</label>
                    <input id="character-name" title="Character Name"
                           :placeholder="character.name"
                           type="text" class="input input_disabled">
                </div>
            </div>
        </section>
    </main>
</template>

<script>
    import Vue from "vue"

    export default {
        name: "app-dashboard",
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
