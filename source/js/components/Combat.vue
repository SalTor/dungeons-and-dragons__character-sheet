<template>
    <main role="main">
        <section>
            <div class="section__content">
                <div class="section__description">
                    <div class="miscellaneous-charges">
                        <div class="miscellaneous-charges__title">Miscellaneous Items With Charges</div>

                        <div class="miscellaneous-items">
                            <div class="miscellaneous-item" v-for="item in user.weapons_with_charges">
                                <div class="miscellaneous-item__name">{{ item.name }}</div>

                                <div class="miscellaneous-item__charges">
                                    <div class="miscellaneous-item__charge-count-modifiers">
                                        <i class="fa fa-refresh miscellaneous-item__charge-count-modifier"  @click="reset_charges(item)"  :class="item.charges.expended === 0 ? 'miscellaneous-item__charge-count-modifier_disabled' : ''"></i>
                                        <i class="fa fa-minus   miscellaneous-item__charge-count-modifier"  @click="restore_charge(item)" :class="item.charges.expended === 0 ? 'miscellaneous-item__charge-count-modifier_disabled' : ''"></i>
                                        <i class="fa fa-plus    miscellaneous-item__charge-count-modifier"  @click="expend_charge(item)"  :class="item.charges.expended === item.charges.total ? 'miscellaneous-item__charge-count-modifier_disabled' : ''"></i>
                                    </div>
                                    <div class="miscellaneous-item__charge" :class="index <= item.charges.expended ? 'miscellaneous-item__charge_expended' : ''" v-for="(index, charge) in item.charges.total"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="spell-book">
                        <div class="spell-book__cantrips" v-for="(cantrips, category) in user.spell_book" v-if="category === 'cantrips'">
                            <div class="cantrips__title">Cantrips:</div>

                            <div class="cantrips__spells">
                                <div class="cantrip" v-for="cantrip in cantrips">{{ cantrip }}</div>
                            </div>
                        </div>

                        <div class="spell-book__spells" v-for="(details, category) in user.spell_book" v-if="category === 'spells'">
                            <div class="spell-tier" v-for="(details, category) in details" v-if="prepared(details.entries).length > 0">
                                <div class="spell-tier__title">
                                    <span>Level {{ category }}</span>
                                    <span class="spell-tier__slot-modifiers">
                                        <i class="fa fa-minus spell-tier__slot-modifier spell-tier__slot-modifier_renew-slot"   @click="restore_spell_slot(details)"  :class="details.slots.expended === 0 ? 'spell-tier__slot-modifier_disabled' : ''"></i>
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
            return {}
        },
        created() {},
        mounted() {},
        methods: {
            spellbook(category, book) {
                return book[category]
            },
            prepared(spells) {
                return _.filter(spells, spell => spell.prepared || spell.ritual)
            },
            expend_spell_slot(details) {
                if(details.slots.expended + 1 <= details.slots.total) {
                    details.slots.expended++
                }
            },
            restore_spell_slot(details) {
                if(details.slots.expended - 1 >= 0) {
                    details.slots.expended--
                }
            },
            reset_spell_slots(details) {
                details.slots.expended = 0
            },
            expend_charge(item) {
                if(item.charges.expended + 1 <= item.charges.total) {
                    item.charges.expended++
                }
            },
            restore_charge(item) {
                if(item.charges.expended - 1 >= 0) {
                    item.charges.expended--
                }
            },
            reset_charges(item) {
                item.charges.expended = 0
            }
        }
    }
</script>
