<template>
    <header>
        <nav class="navigation-container">
            <ul class="navigation">
                <li class="navigation__menu-item">
                    <router-link class="navigation__link" to="/">Dashboard</router-link>
                </li>
                <li class="navigation__menu-item">
                    <router-link class="navigation__link" to="/faq">Frequently Asked Questions</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
    export default {
        name: 'app-navigation',
        data() {
            return {}
        }
    }
</script>
