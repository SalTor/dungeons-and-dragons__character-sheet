<template>
    <div class="prompt" v-on-clickaway="closePrompt">
        <form>
            <div class="prompt__item-details">
                <div class="prompt__item-amt-name">
                    <input type="number" placeholder="1" v-model="amount" title="Amount" min="1" class="prompt__item-amount" required>
                    <div style="text-align: center;margin: 0 5px;">x</div>
                    <input type="text" placeholder="Name" v-model="name" title="Item name" spellcheck="false" class="prompt__item-name" required>
                </div>

                <div v-if="show_price" class="prompt__item-total-price">
                    <input type="text" placeholder="0gp" v-model="price" title="1gp/cp/sp/ep/pp" spellcheck="false" pattern="^\d+(\.\d{1,2})?[csegp]p$" required>

                    <p v-if="parseInt(amount) > 1">= {{ total_value }}</p>
                </div>

                <textarea v-if="show_notes" name="item notes" placeholder="Notes" rows="3" v-model="notes" title="Item notes" required></textarea>
            </div>

            <div class="prompt__controls">
                <button @click="toggleNotes" class="control" type="button">{{ btn_text_notes }}</button>
                <button @click="togglePrice" class="control" type="button">{{ btn_text_price }}</button>

                <div class="prompt__changes">
                    <button class="control cta" v-if="save_button" @click="saveItemDetails" type="submit">{{ save_text }}</button>
                    <button class="control danger" v-if="item_exists" @click="deleteItem" type="button">delete</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import { bus } from '../dungeons_and_dragons_character_sheet'
    import { mixin as clickaway } from 'vue-clickaway'
    import { isNumeric, isString } from '../helper-functions'

    export default {
        name: 'item-view',
        mixins: [clickaway],
        props: {
            type: { type: String, required: true  },
            item: { type: Object }
        },
        computed: {
            btn_text_notes() { return isString(this.notes) ? '- notes' : '+ notes' },
            btn_text_price() { return isString(this.price) ? '- value' : '+ value' },
            save_text() { return this.item_exists ? 'save changes' : 'create' },
            show_notes() { return isString(this.notes) },
            show_price() { return isString(this.price) },
            item_exists() { return this.type === 'update' },
            new_item() { return this.type === 'create' },
            total_value() {
                const price_match = this.price.match(this.price_validation)

                if(price_match) {
                    const units = this.price.match(this.coin_validation)[0]
                    const value = parseFloat(this.price)
                    const total = (isNumeric(this.amount) ? this.amount : 1) * (isNumeric(value) ? value : 0)

                    return total + units
                } else {
                    return 'no value'
                }
            },
            save_button() { return this.any_changes || this.new_item },
            any_changes() {
                if(this.item) {
                    const { name: current_name,
                        amount: current_amount,
                        price: current_price,
                        notes: current_notes } = this

                    const { name: original_name = '',
                        amount: original_amount = 1,
                        price: original_price = null,
                        notes: original_notes = null } = this.item

                    if(current_name !== original_name) return true
                    if(current_amount !== original_amount) return true
                    if(current_price !== original_price) return true

                    return current_notes !== original_notes
                } else {
                    return false
                }
            }
        },
        watch: {
            amount() {
                const amount = parseFloat(this.amount)
                this.amount = isNumeric(amount) ? amount : 1
            },
            price() {
                if(isString(this.price) && this.price.match(this.price_validation)) {
                    const value = parseFloat(this.price)
                    const units = this.price.match(this.coin_validation)[0]
                    this.price = value + units
                }
            }
        },
        data() {
            const { name = '', amount = 1, price = null, notes = null } = this.item || {}

            const item_details = {
                name,
                amount,
                price,
                notes
            }

            if(this.type === 'update') {
                item_details.id = this.item.id
            }

            return {
                price_validation: new RegExp(/^(\d+)?(\.\d{1,2})?[csegp]p$/),
                coin_validation:  new RegExp(/[csegp]p$/),
                ...item_details
            }
        },
        methods: {
            saveItemDetails(event) {
                const { price, notes } = this
                const invalid_price = isString(price) && !price.match(this.price_validation)
                const invalid_notes = isString(notes) && !notes.length > 0

                if(invalid_price || invalid_notes) {
                    // HTML5 form will inform user
                } else if (this.name.length > 0) {
                    event.preventDefault()

                    if(this.item_exists) {
                        bus.$emit('item:update', this)
                    } else {
                        const id = this.createID()
                        bus.$emit('item:create', { id, ...this })
                    }
                }
            }
            , toggleNotes() { this.notes = isString(this.notes) ? null : '' }
            , togglePrice() { this.price = isString(this.price) ? null : '' }
            , deleteItem()  { bus.$emit('item:delete', this.id) }
            , closePrompt() { bus.$emit(`item:close-${ this.item ? 'updater' : 'creator' }`) }
            , createID() {
                return this.createRandomHash() + this.createRandomHash()
                    + '-' + this.createRandomHash() + '-' + this.createRandomHash()
                    + '-' + this.createRandomHash() + '-' + this.createRandomHash()
                    + this.createRandomHash() + this.createRandomHash()
            }
            , createRandomHash() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1)
            }
        }
    }
</script>