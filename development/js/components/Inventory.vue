<template>
    <main role="main">
        <section>
            <div class="section__content section__content_extra-space-above">
                <div class="field-wrapper field-wrapper_direction_vertical">
                    <div class="inventory">
                        <div class="inventory__item-container">
                            <div class="item" v-for="(amount, id) in user.coin_pouch">
                                <div class="item__name">{{ id | coin_type }}</div>

                                <div class="item__amount" @click="coin_modifying(id)">
                                    x{{ amount }}

                                    <div class="item__modifier-container" :class="[ id === coin_being_modified ? 'item__modifier-container_active' : '' ]">
                                        <div class="item-modifier item-modifier_increase"><i class="fa fa-plus"></i></div>
                                        <div class="item-modifier item-modifier_decrease"><i class="fa fa-minus"></i></div>
                                        <div class="item-modifier item-modifier_edit"><i class="fa fa-pencil"></i></div>
                                        <div class="item-modifier item-modifier_remove"><i class="fa fa-eraser"></i></div>
                                    </div>
                                </div>
                            </div>

                            <div class="item" v-for="item in user.inventory">
                                <div class="item__name">{{ item.name }}</div>

                                <div class="item__amount-and-value" v-if="item.amount || item.value">
                                    <div v-if="item.amount">x{{ item.amount }}</div>
                                    <div class="item__value" v-for="(amount, id) in item.value">&nbsp;({{ amount }}{{ id }} {{ item.amount > 1 ? "ea." : "" }})</div>
                                </div>

                                <div class="item__context-toggle" v-if="item.context">
                                    <span>i</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
    import Vue from "vue"

    export default {
        name: "inventory",
        props: ["user"],
        data() {
            return {
                coin_being_modified: ``
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
        },
        mounted() {},
        methods: {
            coin_modifying(id) {
                if(id === this.coin_being_modified) {
                    this.coin_being_modified = ``
                } else {
                    this.coin_being_modified = id
                }
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
