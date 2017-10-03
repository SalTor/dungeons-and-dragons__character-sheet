<template>
    <main role="main">
        <section>
            <div class="section__content" v-if="user.coin_pouch">
                <coin-pouch :coins="user.coin_pouch" />

                <inventory-manager :items="user.inventory" />
            </div>
        </section>
    </main>
</template>

<script>
    import Vue from 'vue'
    import CoinPouch from './coin-pouch.vue'
    import ItemLibrary from './item-library.vue'

    export default {
        name: 'inventory',
        props: {
            user: { type: Object, required: true }
        },
        components: {
            'coin-pouch': CoinPouch,
            'inventory-manager': ItemLibrary
        },
        data() {
            return {}
        },
        methods: {
        }
    }
</script>
