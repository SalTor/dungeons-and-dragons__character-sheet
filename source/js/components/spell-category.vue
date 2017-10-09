<template>
    <div class="spell-book__column">
        <div class="spell-book__category">
            <span>Level {{ level }}</span>

            <span class="spell-book__slots-used">
                <span>{{ expended }}/{{ total }}</span>
                <i class="control decrement" @click="regainSpellSlot" :class="{ disabled: expended === 0     }"></i>
                <i class="control increment" @click="expendSpellSlot" :class="{ disabled: expended === total }"></i>
            </span>
        </div>

        <div class="spell-book__spell" v-for="spell in prepared_spells">{{ spell.name }}</div>
    </div>
</template>

<script>
    import { bus } from '../dungeons_and_dragons_character_sheet'

    export default {
        props: { details: { type: Object, required: true }, level: { type: String, required: true } },
        computed: {
            spells() { return this.details.entries },
            expended() { return this.details.slots.expended },
            prepared_spells() { return this.spells.filter(({ ritual, prepared }) => ritual || prepared) }
        },
        data() {
            return {
                total: this.details.slots.total
            }
        },
        methods: {
            expendSpellSlot() {
                const { expended, total } = this

                if (expended + 1 <= total) {
                    bus.$emit('spell-slot::expend', this.level)
                }
            },
            regainSpellSlot() {
                const { expended } = this

                if (expended - 1 >= 0) {
                    bus.$emit('spell-slot::regain', this.level)
                }
            },
            resetSpellSlots() {
                bus.$emit('spell-slot::reset', this.level)
            }
        }
    }
</script>