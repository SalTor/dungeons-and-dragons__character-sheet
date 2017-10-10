<template>
    <div class="inventory">
        <div class="inventory__controls">
            <input
                label="Item filter"
                placeholder="Filter by name"
                v-model="entriesFilter"
                class="inventory__filter"
                type="text"
                autocorrect="off"
                autocomplete="off"
                autocapitalize="off"
                spellcheck="false"
            >
            <button @click="openItemCreatePrompt" class="inventory__create-item"><span>+ New Entry</span></button>
        </div>

        <div class="inventory__items">
            <item v-for="entry in results" :details="entry" @view="focusItem" :key="createID()" />

            <div v-if="results.length === 0" class="inventory__no-items-found">No items matching "{{ entriesFilter }}" were found.</div>
        </div>

        <transition name="fade">
            <item-prompt type="create" v-if="createItem" />
            <item-prompt type="update" v-if="itemToView" :item="itemToView" />
        </transition>
    </div>
</template>

<script>
    import { bus } from '../dungeons_and_dragons_character_sheet'
    import InventoryItem from './inventory-item.vue'
    import ItemView from './item-view.vue'

    export default {
        name: 'item-library',
        props: {
            items: { type: Array, required: true }
        },
        components: {
            'item': InventoryItem,
            'item-prompt': ItemView
        },
        computed: {
            results() {
                return this.items.filter(this.itemFuzzyMatch)
                    .sort(({name:a},{name:b})=>a===b?0:a<b?-1:1)
            }
        },
        data() {
            return {
                createItem: false,
                itemToView: null,
                entriesFilter: '',
                editCoinPouch: false
            }
        },
        created() {
            bus.$on('item:update', this.closeItemUpdatePrompt)
            bus.$on('item:delete', this.closeItemUpdatePrompt)
            bus.$on('item:create', this.closeItemCreatePrompt)
            bus.$on('item:close-updater', this.closeItemUpdatePrompt)
            bus.$on('item:close-creator', this.closeItemCreatePrompt)
        },
        methods: {
            itemFuzzyMatch({ name }) {
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
            }
            , openItemCreatePrompt() { this.createItem = true }
            , closeItemCreatePrompt() { this.createItem = false }
            , closeItemUpdatePrompt() { this.itemToView = null }
            , focusItem(details) { this.itemToView = details }
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
