<template>
    <header>
        <nav class="navigation-container">
            <ul class="navigation">
                <router-link class="navigation__menu-item" active-class="navigation__menu-item_active" tag="li" to="/">
                    Dashboard</router-link>
            </ul>

            <ul class="navigation">
                <router-link class="navigation__menu-item" active-class="navigation__menu-item_active" tag="li" to="/combat">
                    Combat</router-link>

                <router-link class="navigation__menu-item" active-class="navigation__menu-item_active" tag="li" to="/inventory">
                    Inventory</router-link>

                <router-link class="navigation__menu-item" active-class="navigation__menu-item_active" tag="li" to="/stats">
                    Stats</router-link>

                <router-link class="navigation__menu-item" active-class="navigation__menu-item_active" tag="li" to="/background">
                    Background</router-link>
            </ul>
        </nav>
    </header>
</template>

<script>
    export default {
        name: 'navigation',
        data() {
            return {}
        }
    }
</script>
