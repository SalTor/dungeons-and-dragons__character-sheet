<template>
    <div class="spell-book__column">
        <div class="spell-book__category">
            <span>Level {{ level }}</span>

            <span class="spell-book__slots-used">
                <span>{{ expended }}/{{ total }}</span>
                <i class="control decrement" @click="regain_spell_slot" :class="{ disabled: fresh_start }"></i>
                <i class="control increment" @click="expend_spell_slot" :class="{ disabled: cannot_cast}"></i>
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
            prepared_spells() { return this.spells.filter(({ ritual, prepared }) => ritual || prepared) },
            cannot_cast() { return this.expended === this.total },
            fresh_start() { return this.expended === 0 }
        },
        data() {
            return {
                total: this.details.slots.total
            }
        },
        methods: {
            expend_spell_slot() {
                const { expended, total } = this

                if (expended + 1 <= total) {
                    bus.$emit('spell-slot::lose', this.level)
                }
            },
            regain_spell_slot() {
                const { expended } = this

                if (expended - 1 >= 0) {
                    bus.$emit('spell-slot::gain', this.level)
                }
            },
            reset_spell_slots() {
                bus.$emit('spell-slot::reset', this.level)
            }
        }
    }
</script>