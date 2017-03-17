<template>
    <main role="main">
        <section>
            <div class="section__content section__content_extra-space-above">
                <div class="field-wrapper field-wrapper_direction_vertical">
                    <div class="inventory">
                        <div class="inventory__item-container">
                            <div class="item" v-for="coin in user.coin_pouch">
                                <div class="item__name" :title="coin.type | coin_type">{{ coin.type | coin_type }}</div>

                                <div class="item__amount" @click="coin_modifying(coin.type)" :title="coin.amount | number">
                                    {{ coin.amount | number }}

                                    <transition name="fade">
                                        <div class="item__modifier-container" @click.stop v-on-clickaway="finish_coin_modifying" v-if="coin.type === coin_being_modified">
                                            <input v-focus class="item-modifier item-modifier_edit" type="number" title="amount" v-model="coin.amount" :step="amount_step" min="0" @keydown="alert($event)">
                                        </div>
                                    </transition>
                                </div>
                            </div>

                            <div class="item" v-for="item in user.inventory">
                                <div class="item__name item__name_removeable" @click="item_deleting(item.name)">{{ item.name }}</div>

                                <transition name="fade">
                                    <div class="item__remove" v-if="item_delete === item.name" v-on-clickaway="stop_item_delete" @click.stop="remove(item, user.inventory)">
                                        <span>
                                            <i class="fa fa-trash-o"></i>&nbsp;remove
                                        </span>
                                    </div>
                                </transition>

                                <div class="item__amount-and-value" v-if="item.amount || item.value" @click="item_modifying(item.name)">
                                    <div v-if="item.amount">
                                        {{ item.amount | number }}
                                    </div>
                                    <div class="item__value" v-if="item.amount > 0" v-for="(amount, id) in item.value">&nbsp;({{ amount | number }}{{ id }}{{ item.amount > 1 ? " ea." : "" }})</div>

                                    <transition name="fade">
                                        <div class="item__modifier-container" @click.stop v-on-clickaway="finish_item_modifying" v-if="item.name === item_being_modified">
                                            <input v-focus class="item-modifier item-modifier_edit" type="number" title="amount" v-model="item.amount" :step="amount_step" min="0" @keydown="alert($event)">
                                        </div>
                                    </transition>
                                </div>

                                <div class="item__context-toggle" v-if="item.context" @click="item_focus(item.name)">
                                    <span>i</span>

                                    <transition name="fade">
                                        <div class="item__info" v-on-clickaway="finish_item_focus" v-if="item.name === item_being_focused" @click.stop>
                                            {{ item.context }}
                                        </div>
                                    </transition>
                                </div>
                            </div>
                        </div>

                        <div class="inventory__create-item">
                            <i class="fa fa-plus"></i>
                        </div>

                        
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
    import Vue from "vue"
    import { mixin as clickaway } from "vue-clickaway"

    export default {
        name: "inventory",
        props: ["user"],
        mixins: [ clickaway ],
        data() {
            return {
                coin_being_modified: ``,
                item_being_focused: ``,
                item_being_modified: ``,
                item_delete: ``,
                amount_step: 1
            }
        },
        created() {
            Vue.filter("details", entry => {
                let name = entry.name,
                    amount = entry.amount,
                    value = entry.value, total

                console.log(value)

                return `${name} - ${amount} (${value} ea., totalling ${total})`
            })
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
            Vue.filter("number", entry => {
                return entry.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            })
            Vue.directive('focus', {
                inserted: el => el.focus()
            })
        },
        mounted() {},
        methods: {
            hello() {
                console.log('hello')
            },
            alert(event) {
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
            item_modifying(id) {
                if(id === this.item_being_modified) {
                    this.item_being_modified = ``
                } else {
                    this.item_being_modified = id
                }
            },
            finish_item_focus() {
                this.item_being_focused = undefined
            },
            finish_item_modifying() {
                this.item_being_modified = undefined
            },
            item_focus(item) {
                if(item === this.item_being_focused) {
                    this.item_being_focused = ``
                } else {
                    this.item_being_focused = item
                }
            },
            item_modifying(item) {
                if(item === this.item_being_modified) {
                    this.item_being_modified = ``
                } else {
                    this.item_being_modified = item
                }
            },
            item_deleting(item) {
                if(item === this.item_delete) {
                    this.item_delete = ``
                } else {
                    this.item_delete = item
                }
            },
            stop_item_delete() {
                this.item_delete = ``
            },
            remove(item, origin) {
                this.item_delete = ``

                origin.splice(origin.indexOf(item), 1)
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
