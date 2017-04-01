<template>
    <main role="main">
        <section>
            <div class="section__content section__content_extra-space-above">
                <div class="field-wrapper field-wrapper_direction_vertical">
                    <div class="inventory">
                        <div class="inventory__create-item" @click="item_being_created = true">create item</div>

                        <div class="inventory__item-container">
                            <div class="item__group item__group_coins">
                                <div class="item__wrapper item__wrapper_coins">
                                    <div class="item item_group item_coin" v-for="coin in user.coin_pouch">
                                        <div class="item__name item__name_coin" :title="coin.type | coin_type">{{ coin.type | coin_type }}</div>

                                        <div class="item__amount item__amount_coin" @click="coin_modifying(coin.type)" :title="coin.amount | number">{{ coin.amount | number }}
                                            <transition name="fade">
                                                <div class="item__modifier-container" @click.stop v-on-clickaway="finish_coin_modifying" v-if="coin.type === coin_being_modified">
                                                    <input v-focus class="item-modifier item-modifier_edit" type="number" title="amount" v-model="coin.amount" :step="amount_step" min="0" @keydown="update_shift_amount($event)">
                                                </div>
                                            </transition>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <user-item v-for="item in user.inventory" :item="item" :inventory="user.inventory" :key="calculate__unique_id()"></user-item>
                        </div>
                    </div>

                    <transition name="fade">
                        <div class="inventory__item-creator" v-if="item_being_created">
                            <form class="item-creator__field-container" v-on-clickaway="terminate_item_creation" @submit="create_item(user.inventory)">
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
                                                <select class="field__input_select" name="value_unit" title="Value Units" v-model="new_item_value__currency">
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
    import Vue from "vue"
    import { mixin as clickaway } from "vue-clickaway"
    import Item from "./Item.vue"

    Vue.component("user-item", Item)

    export default {
        name: "inventory",
        props: ["user"],
        mixins: [ clickaway ],
        data() {
            return {
                coin_being_modified: ``,
                amount_step: 1,
                item_being_created: false,
                new_item_name: ``,
                new_item_amount: 1,
                new_item_value__currency: `gp`,
                new_item_value__amount: 0,
                new_item_context: undefined
            }
        },
        created() {
            Vue.filter("coin_type", coin_id => {
                let coin = ""

                switch(coin_id) {
                    case "gp":
                        coin = "Gold Pieces"
                        break
                    case "sp":
                        coin = "Silver Pieces"
                        break
                    case "cp":
                        coin = "Copper Pieces"
                        break
                    case "ep":
                        coin = "Electrum Pieces"
                        break
                    case "pp":
                        coin = "Platinum Pieces"
                        break
                    default:
                        break
                }

                return coin
            })
        },
        mounted() {},
        methods: {
            create_item(array) {
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
            coin_modifying(id) {
                if(id === this.coin_being_modified) {
                    this.coin_being_modified = ``
                } else {
                    this.coin_being_modified = id
                }
            },
            finish_coin_modifying() {
                this.coin_being_modified = undefined
            },

            coinage(type, amount) {
                return `${amount}${type}`
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
