<template>
    <div class="item-view" v-on-clickaway="closePrompt">
        <form>
            <div class="item-view__details">
                <div class="item-view__amt-name">
                    <input type="number" placeholder="1" v-model="amount" title="Amount" min="1" class="item-view__amount" required>
                    <div style="text-align: center;margin: 0 5px;">x</div>
                    <input type="text" placeholder="Name" v-model="name" title="Item name" spellcheck="false" class="item-view__name" required>
                </div>

                <div v-if="show_price" class="item-view__total-price">
                    <input type="text" placeholder="0gp" v-model="price" title="1gp/cp/sp/ep/pp" spellcheck="false" pattern="^\d+(\.\d{1,2})?[csegp]p$" required>

                    <p>= {{ total_value }}</p>
                </div>

                <textarea v-if="show_notes" name="item notes" placeholder="Notes" rows="3" v-model="notes" title="Item notes" required></textarea>
            </div>

            <div class="item-view__controls">
                <button @click="toggleNotes" type="button">{{ btn_text_notes }}</button>
                <button @click="togglePrice" type="button">{{ btn_text_price }}</button>

                <div class="item-view__changes">
                    <button class="cta" v-if="save_button" @click="saveItemDetails" type="submit">{{ save_text }}</button>
                    <button class="danger" v-if="item_exists" @click="removeItem" type="button">delete</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
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
            item_exists() { return this.type === 'view' },
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

            if(this.type === 'view') {
                item_details.id = this.item.id
            }

            return {
                price_validation: new RegExp(/^(\d+)?(\.\d{1,2})?[csegp]p$/),
                coin_validation:  new RegExp(/[csegp]p$/),
                ...item_details
            }
        },
        methods: {
            removeItem() {
                this.$emit('delete', this.id)
            },
            toggleNotes() { this.notes = isString(this.notes) ? null : '' },
            togglePrice() { this.price = isString(this.price) ? null : '' },
            closePrompt(event) {
                if(event.path[3].className !== 'item-view') {
                    this.$emit('close')
                }
            },
            saveItemDetails(event) {
                const { price, notes } = this
                const invalid_price = isString(price) && !price.match(this.price_validation)
                const invalid_notes = isString(notes) && !notes.length > 0

                if(invalid_price || invalid_notes) {
                    // HTML5 form will inform user
                } else if (this.name.length > 0) {
                    event.preventDefault()

                    if(this.item_exists) {
                        this.$emit('update', this)
                    } else {
                        this.$emit('create', this)
                    }
                }
            }
        }
    }
</script>