<template>
    <main role="main">
        <section>
            <div class="section__content" v-if="!loading">
                <div class="section__description">
                    <div class="spell-book">
                        <div class="spell-book__cantrips" v-for="(cantrips, category) in user.spell_book" v-if="category === 'cantrips'">
                            <div class="cantrips__title">Cantrips:</div>

                            <div class="cantrips__spells">
                                <div class="cantrip" v-for="cantrip in cantrips">{{cantrip}}</div>
                            </div>
                        </div>

                        <div class="spell-book__spells" v-for="(details, category) in user.spell_book" v-if="category === 'spells'">
                            <div class="spell-tier" v-for="(details, category) in details" v-if="prepared(details.entries).length > 0">
                                <div class="spell-tier__title">
                                    <span>Level {{ category }}</span>
                                    <span class="spell-tier__slot-modifiers">
                                        <i class="fa fa-minus spell-tier__slot-modifier spell-tier__slot-modifier_renew-slot"   @click="renew_spell_slot(details)"  :class="details.slots.expended === 0 ? 'spell-tier__slot-modifier_disabled' : ''"></i>
                                        <i class="fa fa-plus  spell-tier__slot-modifier"   @click="expend_spell_slot(details)" :class="details.slots.expended === details.slots.total ? 'spell-tier__slot-modifier_disabled' : ''"></i>
                                    </span>
                                </div>
                                <div class="spell-tier__slots">
                                    <span>{{ details.slots.expended }}/{{ details.slots.total }} slots used</span>
                                    <span><i class="fa fa-refresh spell-tier__slot-modifier spell-tier__slot-modifier_reset" @click="reset_spell_slots(details)" :class="details.slots.expended === 0 ? 'spell-tier__slot-modifier_disabled' : ''"></i></span>
                                </div>

                                <div class="spell-tier__spells">
                                    <div class="spell" v-for="spell in prepared(details.entries)">
                                        <div class="spell__name">{{ spell.name }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
    let _ = require('lodash')

    export default {
        name: "combat",
        props: [ "user" ],
        data(){
            return {
                loading: true
            }
        },
        created() {
            this.loading = false
        },
        mounted() {
            _.map(this.user.spell_book, index => console.log(index))
        },
        methods: {
            spellbook(category, book) {
                return book[category]
            },
            prepared(spells) {
                return _.filter(spells, spell => spell.prepared)
            },
            expend_spell_slot(details) {
                if(details.slots.expended + 1 <= details.slots.total) {
                    details.slots.expended++
                }
            },
            renew_spell_slot(details) {
                if(details.slots.expended - 1 >= 0) {
                    details.slots.expended--
                }
            },
            reset_spell_slots(details) {
                details.slots.expended = 0
            }
        }
    }
</script>
