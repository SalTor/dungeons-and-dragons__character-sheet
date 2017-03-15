<template>
    <main role="main">
        <section>
            <div class="section__content section__content_extra-space-above">
                <h1 class="section__header">This is what we've got.</h1>

                <div class="field-wrapper field-wrapper_direction_vertical">
                    <div class="inventory">
                        <div class="inventory__item">
                            <div class="item__name">Coin pouch:</div>

                            <div class="item__contents">
                                <span class="content coins" v-for="(amount, id) in user.coin_pouch">{{ test(id, amount) }}</span>
                            </div>
                        </div>

                        <div class="inventory__item" v-for="item in user.inventory">
                            <span class="item__amount" v-if="item.amount">{{ item.amount }} <i class="fa fa-close"></i></span>
                            <span class="item__name" :class="item.amount ? 'item__name_multiple' : ''">{{ item.name }}</span>
                            <span v-if="item.amount">
                                <span class="item__value coins" v-if="item.value">
                                    (<span v-for="(amount, id) in item.value">{{ amount }} {{ id }} ea.</span>)
                                </span>
                            </span>
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
                coin_pouch: {}
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
        },
        mounted() {},
        methods: {
            test(type, amount) {
                return `${amount}${type}, `
            }
        }
    }
</script>
