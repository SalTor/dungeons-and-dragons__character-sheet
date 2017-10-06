<template>
    <div class="inventory">
        <div class="inventory__controls">
            <input
                title="Item filter"
                placeholder="Filter by name"
                v-model="entriesFilter"
                class="inventory__filter"
                type="text"
                autocorrect="off"
                autocomplete="off"
                autocapitalize="off"
                spellcheck="false"
            >
            <button @click="openItemCreationPrompt" class="inventory__create-item"><span>+ New Entry</span></button>
        </div>

        <div class="inventory__items">
            <item v-for="entry in results" :details="entry" @view="focusItem" :key="createID()" />

            <div v-if="results.length === 0" class="inventory__no-items-found">No items matching "{{ entriesFilter }}" were found.</div>
        </div>

        <transition name="fade">
            <edit-coin-pouch
                v-if="editCoinPouch"
            />

            <item-prompt :type="'create'" v-if="displayCreationPrompt"
                @close="closeItemCreationPrompt"
                @create="createItem"
            />

            <item-prompt :type="'view'" v-if="itemBeingFocused"
                :item="itemInFocus"
                @close="unfocusItem"
                @update="updateItemDetails"
                @delete="deleteItem"
            />
        </transition>
    </div>
</template>

<script>
    import InventoryItem from './inventory-item.vue'
    import ItemView from './item-view.vue'
    import CoinPouchView from './coin-pouch-edit.vue'

    export default {
        name: 'item-library',
        props: {
            items: { type: Array, required: true }
        },
        components: {
            'item': InventoryItem,
            'item-prompt': ItemView,
            'edit-coin-pouch': CoinPouchView
        },
        computed: {
            results() {
                return this.items.filter(this.entriesFuzzyMatch)
                    .sort(({name:a},{name:b})=>a===b?0:a<b?-1:1)
            },
            itemBeingFocused() { return Object.keys(this.itemInFocus).length !== 0 }
        },
        data() {
            return {
                displayCreationPrompt: false,
                entriesFilter: '',
                itemInFocus: {},
                editCoinPouch: false
            }
        },
        methods: {
            openItemCreationPrompt() { this.displayCreationPrompt = true },
            closeItemCreationPrompt() { this.displayCreationPrompt = false },
            createItem(details) {
                const id = this.createID()

                this.$emit('create', { id, ...details })

                this.closeItemCreationPrompt()
            },
            unfocusItem() {
                this.itemInFocus = {}
            },
            focusItem(details) {
                this.itemInFocus = details
            },
            updateItemDetails(details) {
                this.$emit('update', details)

                this.unfocusItem()
            },
            deleteItem(id) {
                this.$emit('delete', id)

                this.unfocusItem()
            },
            entriesFuzzyMatch({ name }) {
                const search = this.entriesFilter.toUpperCase()
                const text   = name.toUpperCase()

                let j = -1 // remembers position of last found character

                // consider each search character one at a time
                for (let i = 0; i < search.length; i++) {
                    let l = search[i]
                    if (l === ' ') continue     // ignore spaces

                    j = text.indexOf(l, j+1)    // search for character & update position
                    if (j === -1) return false  // if it's not found, exclude this item
                }

                return true
            },
            createID() {
                return this.createRandomHash() + this.createRandomHash()
                    + '-' + this.createRandomHash() + '-' + this.createRandomHash()
                    + '-' + this.createRandomHash() + '-' + this.createRandomHash()
                    + this.createRandomHash() + this.createRandomHash()
            },
            createRandomHash() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1)
            }
        }
    }
</script>