<template>
    <div class="prompt" v-on-clickaway="closePouch">
        <form>
            <div class="prompt__coins">
                <div class="coin">
                    <input v-model="copper" id="coins_copper" type="number" title="Copper coins" min="0" required>
                    <label for="coins_copper">copper</label>
                </div>
                <div class="coin">
                    <input v-model="silver" id="coins_silver" type="number" title="Silver coins" min="0" required>
                    <label for="coins_silver">silver</label>
                </div>
                <div class="coin">
                    <input v-model="electrum" id="coins_electrum" type="number" title="Electrum coins" min="0" required>
                    <label for="coins_electrum">electrum</label>
                </div>
                <div class="coin">
                    <input v-model="gold" id="coins_gold" type="number" title="Gold coins" min="0" required>
                    <label for="coins_gold">gold</label>
                </div>
                <div class="coin">
                    <input v-model="platinum" id="coins_platinum" type="number" title="Platinum coins" min="0" required>
                    <label for="coins_platinum">platinum</label>
                </div>
            </div>

            <div class="prompt__controls">
                <button @click="save" class="control cta" :class="{ disabled: !any_changes }" :title="save_hover_text" type="button">{{ btn_text_save }}</button>
            </div>
        </form>
    </div>
</template>

<script>
    import { isNumeric } from '../helper-functions'
    import { mixin as clickaway } from 'vue-clickaway'

    export default {
        name: 'coin-pouch-view',
        mixins: [clickaway],
        props: { coins: { type: Object, required: true } },
        computed: {
            any_changes() {
                const mismatch = coin => parseInt(this[coin]) !== parseInt(this.coins[coin])

                return Object.keys(this.coins)
                    .some(mismatch)
            }
            , btn_text_save() { return this.any_changes ? 'save' : 'no changes' }
        },
        watch: {
            copper(coin) {   this.copper   = this.format(coin) },
            silver(coin) {   this.silver   = this.format(coin) },
            electrum(coin) { this.electrum = this.format(coin) },
            gold(coin) {     this.gold     = this.format(coin) },
            platinum(coin) { this.platinum = this.format(coin) }
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
            format(coin) { return `${ isNumeric(parseInt(coin)) ? parseInt(coin) : 0 }` },
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