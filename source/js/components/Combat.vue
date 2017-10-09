<template>
    <main role="main">
        <section>
            <div class="section__content">
                <div class="combat-page">
                    <div class="spell-book">
                        <div class="spell-book__column" v-if="cantrips">
                            <div class="spell-book__category">
                                <span>Cantrips</span>
                            </div>

                            <div class="spell-book__spell" v-for="cantrip in cantrips">{{ cantrip }}</div>
                        </div>

                        <spell-group v-for="(details, level) in spells" :details="details" :level="level" :key="level" />
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
                                <death-save type="pass" :value="user.death_saves.pass" />
                                <death-save type="fail" :value="user.death_saves.fail" />
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
    import { bus } from '../dungeons_and_dragons_character_sheet'
    import Vue from 'vue'
    import SpellCategory from './spell-category.vue'
    import DeathSave from './death-save.vue'

    export default {
        name: 'combat',
        props: {
            user: { type: Object, required: true }
        },
        components: {
            'death-save': DeathSave,
            'spell-group': SpellCategory
        },
        computed: {
            cantrips() {
                const spell_book = this.user.hasOwnProperty('spell_book')

                return spell_book ? this.user.spell_book.cantrips : null
            },
            spells() {
                const spell_book = this.user.hasOwnProperty('spell_book')

                return spell_book ? this.user.spell_book.spells : {}
            }
        },
        data() {
            return {}
        }
    }
</script>
