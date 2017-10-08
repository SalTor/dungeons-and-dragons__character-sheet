<template>
    <div class="prompt" v-on-clickaway="closePouch">
        <form>
            <div class="prompt__coins">
                <div class="coin">
                    <input v-model="copper" id="coins_copper" type="number" title="Copper coins" min="0">
                    <label for="coins_copper">copper</label>
                </div>
                <div class="coin">
                    <input v-model="silver" id="coins_silver" type="number" title="Silver coins" min="0">
                    <label for="coins_silver">silver</label>
                </div>
                <div class="coin">
                    <input v-model="electrum" id="coins_electrum" type="number" title="Electrum coins" min="0">
                    <label for="coins_electrum">electrum</label>
                </div>
                <div class="coin">
                    <input v-model="gold" id="coins_gold" type="number" title="Gold coins" min="0">
                    <label for="coins_gold">gold</label>
                </div>
                <div class="coin">
                    <input v-model="platinum" id="coins_platinum" type="number" title="Platinum coins" min="0">
                    <label for="coins_platinum">platinum</label>
                </div>
            </div>

            <div class="prompt__controls">
                <button @click="save" class="control cta" :class="{ disabled: !any_changes }" :title="save_hover_text" type="button">save</button>
            </div>
        </form>
    </div>
</template>

<script>
    import { mixin as clickaway } from 'vue-clickaway'

    export default {
        name: 'coin-pouch-view',
        mixins: [clickaway],
        props: { coins: { type: Object, required: true } },
        computed: {
            any_changes() {
                const coins = Object.keys(this.coins)
                const mismatches = coins.filter(coin => parseInt(this[coin]) !== parseInt(this.coins[coin]))

                return mismatches.length > 0
            }
        },
        data() {
            const coins = {
                copper: this.coins.copper,
                silver: this.coins.silver,
                electrum: this.coins.electrum,
                gold: this.coins.gold,
                platinum: this.coins.platinum
            }

            return {
                save_hover_text: this.any_changes ? '' : 'No changes to save.',
                ...coins
            }
        },
        methods: {
            closePouch() { this.$emit('close') },
            save(event) {
                if(this.any_changes) {
                    event.preventDefault()
                    this.$emit('update', this)
                }
            }
        }
    }
</script>