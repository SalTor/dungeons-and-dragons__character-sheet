<template>
    <main role="main">
        <section>
            <div class="section__content">
                <div class="combat-page">
                    <div class="spell-book" v-if="user.spell_book">
                        <div class="spell-book__column">
                            <div class="spell-book__category">
                                <span>Cantrips</span>
                            </div>

                            <div class="spell-book__spell" v-for="cantrip in user.spell_book.cantrips">{{ cantrip }}</div>
                        </div>

                        <div class="spell-book__column" v-for="(details, category) in user.spell_book.spells">
                            <div class="spell-book__category">
                                <span>Level {{ category }}</span>

                                <span class="spell-book__slots-used">
                                    <span>{{ details.slots.expended }}/{{ details.slots.total }}</span>
                                    <i class="control decrement" @click="regain_spell_slot(details)" :class="details.slots.expended === 0 ? 'disabled' : ''"></i>
                                    <i class="control increment" @click="expend_spell_slot(details)" :class="details.slots.expended === details.slots.total ? 'disabled' : ''"></i>
                                </span>
                            </div>

                            <div class="spell-book__spell" v-for="spell in prepared(details.entries)">{{ spell.name }}</div>
                        </div>
                    </div>

                    <div class="combat-stats" v-if="user.death_saves">
                        <article class="cb-stat hitpoints">
                            <div class="cb-stat__value">
                                <span>{{ user.hitpoints.temp | sign }}</span>
                                <strong>{{ user.hitpoints.current }}</strong>
                                <span>{{ user.hitpoints.max }}</span>
                            </div>
                            <div class="cb-stat__label">
                                <span class="sub">temp</span>
                                <span class="focus">current hp</span>
                                <span class="sub">max</span>
                            </div>
                        </article>

                        <div class="cb-stat-wrapper">
                            <article class="cb-stat">
                                <div class="cb-stat__value">
                                    <strong>{{ user.spell_attack_bonus }}</strong>
                                </div>
                                <div class="cb-stat__label">
                                    <span>spell attack bonus</span>
                                </div>
                            </article>

                            <article class="cb-stat">
                                <div class="cb-stat__value">
                                    <strong>{{ user.spell_save_dc }}</strong>
                                </div>
                                <div class="cb-stat__label">
                                    <span>spell save dc</span>
                                </div>
                            </article>

                            <article class="cb-stat">
                                <div class="cb-stat__value">
                                    <strong>{{ user.armor_class }}</strong>
                                </div>
                                <div class="cb-stat__label">
                                    <span>armor class</span>
                                </div>
                            </article>

                            <article class="cb-stat">
                                <div class="cb-stat__value">
                                    <strong>{{ user.initiative_modifier | sign }}</strong>
                                </div>
                                <div class="cb-stat__label">
                                    <span>initiative</span>
                                </div>
                            </article>

                            <article class="cb-stat">
                                <div class="cb-stat__value">
                                    <strong>{{ user.speed }}</strong>
                                </div>
                                <div class="cb-stat__label">
                                    <span>speed</span>
                                </div>
                            </article>

                            <article class="cb-stat">
                                <div class="cb-stat__value">
                                    <span>{{ user.primary_ability }}</span>
                                </div>
                                <div class="cb-stat__label">
                                    <span>spellcasting ability</span>
                                </div>
                            </article>

                            <article class="cb-stat">
                                <div class="cb-stat__value">
                                    <span>{{ user.inspiration_modifier | sign }}</span>
                                </div>
                                <div class="cb-stat__label">
                                    <span>inspiration</span>
                                </div>
                            </article>
                        </div>

                        <article class="cb-stat death-saves">
                            <div class="cb-stat__value">
                                <death-save type="successes" @update="ds__pass" @reset="ds__reset_p" :value="user.death_saves[0]" />
                                <death-save type="failures"  @update="ds__fail" @reset="ds__reset_f" :value="user.death_saves[1]" />
                            </div>
                            <div class="cb-stat__label">
                                <span>death saves</span>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
    import Vue from 'vue'
    import DeathSave from './death-save.vue'

    export default {
        name: 'combat',
        props: {
            user: {
                type: Object,
                required: true
            }
        },
        components: {
            'death-save': DeathSave
        },
        data() {
            return {
                death_saves: this.user.death_saves
            }
        },
        methods: {
            ds__reset_p() {
                const [ , fail ] = this.user.death_saves
                this.user.death_saves = [ 0, fail ]
            },
            ds__reset_f() {
                const [ pass, ] = this.user.death_saves
                this.user.death_saves = [ pass, 0 ]
            },
            ds__pass() {
                if(this.user.death_saves[0] + 1 <= 3) {
                    const [ pass, fail ] = this.user.death_saves
                    this.user.death_saves = [ pass + 1, fail ]
                }
            },
            ds__fail() {
                if(this.user.death_saves[1] + 1 <= 3) {
                    const [ pass, fail ] = this.user.death_saves
                    this.user.death_saves = [ pass, fail +1 ]
                }
            },
            prepared(spells) {
                return spells.filter(spell => spell.prepared || spell.ritual)
            },
            expend_spell_slot(spell_category) {
                if (spell_category.slots.expended + 1 <= spell_category.slots.total) {
                    spell_category.slots.expended++
                }
            },
            regain_spell_slot(spell_category) {
                if (spell_category.slots.expended - 1 >= 0) {
                    spell_category.slots.expended--
                }
            },
            reset_spell_slots(spell_category) {
                spell_category.slots.expended = 0
            }
        }
    }
</script>
