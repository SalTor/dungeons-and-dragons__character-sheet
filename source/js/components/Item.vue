<template>
    <div class="item">
        <div class="item__name item__name_removeable" @click="item_deleting(item.name)">{{ item.name }}</div>

        <transition name="fade">
            <div class="item__remove" v-if="item_delete === item.name" v-on-clickaway="stop_item_delete" @click.stop="remove(item, inventory)">
                <span>
                    <i class="fa fa-trash-o"></i>&nbsp;remove
                </span>
            </div>
        </transition>

        <div class="item__amount-and-value" @click="item_modifying(item.name)">
            <div v-if="item.amount > 1">
                {{ item.amount | number }}<i v-if="item.value">&nbsp;</i>
            </div>
            <div class="item__value" v-if="item.amount > 0" v-for="(amount, id) in item.value">
                <span v-if="item.amount > 1">(</span><span v-if="amount > 0">{{ amount | number }}{{ id }}{{ item.amount > 1 ? " ea." : "" }}</span><span v-if="item.amount > 1">)</span>
            </div>
            <span class="item__increment-amount" @click.stop="item.amount++" v-if="item.amount < 2 && !item.value">+1</span>

            <transition name="fade">
                <div class="item__modifier-container" @click.stop v-on-clickaway="finish_item_modifying" v-if="item.name === item_being_modified">
                    <input v-focus class="item-modifier item-modifier_edit" type="number" title="amount" v-model="item.amount" :step="amount_step" min="1" @keydown="update_shift_amount($event)">
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

</template>

<script>
    import Vue from "vue"
    import { mixin as clickaway } from "vue-clickaway"

    export default {
        name: "user-item",
        props: ["item", "inventory"],
        mixins: [ clickaway ],
        data() {
            return {
                item_being_focused: ``,
                item_being_modified: ``,
                item_delete: ``,
                amount_step: 1
            }
        },
        methods: {
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
            update_shift_amount(event) {
                if (event.shiftKey) {
                    this.amount_step = 10
                } else {
                    this.amount_step = 1
                }
            }
        }
    }
</script>
