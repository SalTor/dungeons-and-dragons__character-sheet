<template>
    <div class="item-view">
        <form>
            <div class="item-view__details">
                <div class="item-view__amt-name">
                    <input type="number" placeholder="Amount" title="Amount" min="1" class="item-view__amount">
                    <input type="text" placeholder="Name" title="Item name" spellcheck="false" class="item-view__name" required>
                </div>

                <div>
                    <input type="text" placeholder="Unit price. Ex: 20gp" title="Unit price" spellcheck="false">
                </div>

                <textarea name="item notes" placeholder="Notes" rows="3" title="Item notes"></textarea>
            </div>

            <div class="item-view__controls">
                <!--<button v-if="anyChanges" @click="saveItemDetails" type="submit">save</button>-->
                <!--<button v-if="!notes" @click="showNotes" type="button">+ notes</button>-->
                <!--<button @click="removeItem" type="button">delete</button>-->
            </div>
        </form>
    </div>
</template>

<script>
    import { mixin as clickaway } from 'vue-clickaway'

    export default {
        name: 'coin-pouch-view',
        mixins: [clickaway]
    }
</script>