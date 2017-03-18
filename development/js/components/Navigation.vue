<template>
    <header v-on-clickaway="close_nav">
        <nav class="navigation-container">
            <div class="navigation__toggle-and-logo">
                <button class="navigation__toggle" :class="navigation__open ? 'navigation__toggle_active' : ''" @click="toggle_nav"></button>
            </div>

            <div class="navigation-wrapper" :class="navigation__open ? 'navigation-wrapper_open' : ''" @click="handle_nav($event)">
                <ul class="navigation">
                    <router-link class="navigation__menu-item" active-class="navigation__menu-item_active" tag="li" to="/dashboard">
                        Dashboard</router-link>
                </ul>

                <ul class="navigation">
                    <router-link class="navigation__menu-item" active-class="navigation__menu-item_active" tag="li" to="/combat">
                        Combat</router-link>

                    <router-link class="navigation__menu-item" active-class="navigation__menu-item_active" tag="li" to="/inventory">
                        Inventory</router-link>

                    <router-link class="navigation__menu-item" active-class="navigation__menu-item_active" tag="li" to="/stats">
                        Stats</router-link>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>
    import { mixin as clickaway } from "vue-clickaway"

    export default {
        name: 'navigation',
        data() {
            return {
                navigation__open: false,
            }
        },
        watch: {
            '$route' (to, from) {
                this.close_nav()
            }
        },
        mixins: [ clickaway ],
        methods: {
            hello() {
                console.log('hello')
            },
            close_nav() {
                if(this.navigation__open) {
                    this.navigation__open = false
                }
            },
            toggle_nav() {
                this.navigation__open = !this.navigation__open
            },
            handle_nav(event) {
                if(event.target.classList.contains(`navigation__menu-item`)) {
                    this.close_nav()
                }
            }
        }
    }
</script>
