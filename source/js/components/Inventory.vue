<template>
    <main role="main">
        <section>
            <div class="section__content">
                <div class="inventory-page" v-if="coins && items">
                    <coin-pouch :coins="coins" @open="openCoinPouch" />

                    <inventory-manager :items="items" />
                </div>
            </div>
        </section>

        <transition name="fade">
            <edit-coin-pouch v-if="coin_pouch" :coins="coins" />
        </transition>
    </main>
</template>

<script>
    import { bus } from '../dungeons_and_dragons_character_sheet'
    import Vue from 'vue'
    import CoinPouch from './coin-pouch.vue'
    import ItemLibrary from './item-library.vue'
    import CoinPouchView from './coin-pouch-edit.vue'

    export default {
        name: 'inventory',
        props: {
            user: { type: Object, required: true }
        },
        components: {
            'coin-pouch': CoinPouch
            , 'edit-coin-pouch': CoinPouchView
            , 'inventory-manager': ItemLibrary
        },
        computed: {
            coins() { return this.user.coin_pouch }
            , items() { return this.user.inventory }
            , coin_pouch() { return this.editCoinPouch && this.coins }
        },
        created() {
            bus.$on('coin-pouch:update', this.closeCoinPouch)
            bus.$on('coin-pouch:close',  this.closeCoinPouch)
        },
        data() {
            return {
                editCoinPouch: false
            }
        },
        methods: {
            deleteItem(id) { this.$emit('delItem', id) }
            , openCoinPouch() { this.editCoinPouch = true }
            , closeCoinPouch() { this.editCoinPouch = false  }
        }
    }
</script>
