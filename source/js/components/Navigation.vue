<template>
    <header v-on-clickaway="close_nav">
        <nav class="navigation-container">
            <div class="navigation__toggle-and-logo">
                <button class="navigation__toggle" :class="navigation__open ? 'navigation__toggle_active' : ''" @click="toggle_nav"></button>
            </div>

            <div class="navigation-wrapper" :class="navigation__open ? 'navigation-wrapper_open' : ''" @click="handle_nav($event)">
                <ul class="navigation">
                    <router-link to="/combat" class="navigation__menu-item" active-class="navigation__menu-item_active" tag="li">Combat</router-link>

                    <router-link to="/inventory" class="navigation__menu-item" active-class="navigation__menu-item_active" tag="li">Inventory</router-link>

                    <router-link to="/stats" class="navigation__menu-item" active-class="navigation__menu-item_active" tag="li">Stats</router-link>

                    <router-link to="/spellbook" class="navigation__menu-item" active-class="navigation__menu-item_active" tag="li">Spellbook</router-link>

                    <router-link to="/background" class="navigation__menu-item" active-class="navigation__menu-item_active" tag="li">Background</router-link>
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
