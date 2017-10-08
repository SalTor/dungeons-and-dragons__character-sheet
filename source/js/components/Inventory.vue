<template>
    <main role="main">
        <section>
            <div class="section__content" v-if="coins && items">
                <coin-pouch :coins="coins" @open="openCoinPouch" />

                <inventory-manager :items="items" @delete="deleteItem" @update="updateItem" @create="createItem" />
            </div>
        </section>

        <transition name="fade">
            <edit-coin-pouch v-if="coin_pouch" :coins="coins" @close="closeCoinPouch" @update="updateCoinPouch" />
        </transition>
    </main>
</template>

<script>
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
        data() {
            return {
                editCoinPouch: false
            }
        },
        methods: {
            deleteItem(id) { this.$emit('delItem', id) }
            , updateItem(details) { this.$emit('updateItem', details) }
            , createItem(details) { this.$emit('createItem', details) }
            , openCoinPouch() { this.editCoinPouch = true }
            , closeCoinPouch() { this.editCoinPouch = false  }
            , updateCoinPouch(new_coins) {
                this.editCoinPouch = false

                this.$emit('updateCoins', new_coins)
            }
        }
    }
</script>
