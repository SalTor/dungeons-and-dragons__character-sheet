<template>
    <main role="main">
        <section>
            <div class="section__content" v-if="user.coin_pouch">
                <coin-pouch :coins="user.coin_pouch" />

                <div class="field-wrapper field-wrapper_direction_vertical">
                    <div class="inventory">
                        <div class="inventory__create-item" @click="item_being_created = true">create item</div>

                        <div class="inventory__item-container">
                            <user-item v-for="item in user.inventory" :item="item" :inventory="user.inventory" :key="calculate__unique_id()"></user-item>
                        </div>
                    </div>

                    <transition name="fade">
                        <div class="inventory__item-creator" v-if="item_being_created">
                            <form class="item-creator__field-container" v-on-clickaway="terminate_item_creation" @submit="create_item($event, user.inventory)">
                                <div class="field__label-and-input">
                                    <label class="field__label item-creator__field-label">Item Name</label>
                                    <input v-model="new_item_name" class="field__input item-creator__name" placeholder="Potion of death" type="text" title="Item Name" required>
                                </div>

                                <div class="field__label-and-input">
                                    <label class="field__label item-creator__field-label">Amount</label>
                                    <input v-model="new_item_amount" class="field__input item-creator__amount" :step="amount_step" min="1" @keydown="update_shift_amount($event)" type="number" title="Amount of Item">
                                </div>

                                <div class="field-group">
                                    <div class="field__label-and-input">
                                        <label class="field__label item-creator__field-label">Value</label>

                                        <div class="field-group">
                                            <input v-model="new_item_value__amount" class="field__input field__input_inline item-creator__value" :step="amount_step" min="0" @keydown="update_shift_amount($event)" type="number"  title="Value Each">

                                            <div class="field__select-wrapper">
                                                <select class="field__input_select" title="Value Units" v-model="new_item_value__currency">
                                                    <option value="gp">gold</option>
                                                    <option value="cp">copper</option>
                                                    <option value="sp">silver</option>
                                                    <option value="ep">electrum</option>
                                                    <option value="pp">platinum</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="field__label-and-input">
                                    <label class="field__label item-creator__field-label">Context</label>

                                    <textarea title="Context" class="field__input field__input_text-area item-creator__context" v-model="new_item_context"></textarea>
                                </div>

                                <button class="button button_create-item" type="submit">Create Item</button>
                            </form>
                        </div>
                    </transition>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
    import Vue from 'vue'
    import { mixin as clickaway } from 'vue-clickaway'
    import Item from './Item.vue'
    import CoinPouch from './coin-pouch.vue'

    export default {
        name: 'inventory',
        props: ["user"],
        mixins: [ clickaway ],
        components: {
            'user-item': Item,
            'coin-pouch': CoinPouch
        },
        data() {
            return {
                coin_being_modified: '',
                amount_step: 1,
                item_being_created: false,
                new_item_name: ``,
                new_item_amount: 1,
                new_item_value__currency: 'gp',
                new_item_value__amount: 0,
                new_item_context: undefined
            }
        },
        methods: {
            create_item(event, array) {
                event.preventDefault()

                let new_item = {
                    name: this.new_item_name,
                    amount: this.new_item_amount,
                    context: this.new_item_context
                }
                if(this.new_item_value__amount > 0) {
                    new_item.value = {}
                    new_item.value[this.new_item_value__currency] = this.new_item_value__amount
                }

                array.push(new_item)

                this.item_being_created = false
                this.new_item_name = ``
                this.new_item_amount = 1
                this.new_item_value__currency = `gp`
                this.new_item_value__amount = 0
                this.new_item_context = undefined
            },
            terminate_item_creation() {
                if(this.item_being_created) {
                    this.item_being_created = false
                }
            },
            update_shift_amount(event) {
                if (event.shiftKey) {
                    this.amount_step = 10
                } else {
                    this.amount_step = 1
                }
            },
            calculate__random_hash() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1)
            },
            calculate__unique_id() {
                return this.calculate__random_hash() + this.calculate__random_hash()
                    + '-' + this.calculate__random_hash() + '-' + this.calculate__random_hash()
                    + '-' + this.calculate__random_hash() + '-' + this.calculate__random_hash()
                    + this.calculate__random_hash() + this.calculate__random_hash()
            }
        }
    }
</script>
