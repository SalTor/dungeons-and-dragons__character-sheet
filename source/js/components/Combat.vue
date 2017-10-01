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

                    <div class="combat-stats" v-if="user">
                        <article class="cb-stat hitpoints">
                            <div class="cb-stat__value">
                                <span>+10</span>
                                <strong>47</strong>
                                <span>60</span>
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
                                    <strong>9</strong>
                                </div>
                                <div class="cb-stat__label">
                                    <span>spell attack bonus</span>
                                </div>
                            </article>

                            <article class="cb-stat">
                                <div class="cb-stat__value">
                                    <strong>17</strong>
                                </div>
                                <div class="cb-stat__label">
                                    <span>spell save dc</span>
                                </div>
                            </article>

                            <article class="cb-stat">
                                <div class="cb-stat__value">
                                    <strong>14</strong>
                                </div>
                                <div class="cb-stat__label">
                                    <span>armor class</span>
                                </div>
                            </article>

                            <article class="cb-stat">
                                <div class="cb-stat__value">
                                    <strong>+4</strong>
                                </div>
                                <div class="cb-stat__label">
                                    <span>initiative</span>
                                </div>
                            </article>

                            <article class="cb-stat">
                                <div class="cb-stat__value">
                                    <strong>30</strong>
                                </div>
                                <div class="cb-stat__label">
                                    <span>speed</span>
                                </div>
                            </article>

                            <article class="cb-stat">
                                <div class="cb-stat__value">
                                    <span>intelligence</span>
                                </div>
                                <div class="cb-stat__label">
                                    <span>spellcasting ability</span>
                                </div>
                            </article>

                            <article class="cb-stat">
                                <div class="cb-stat__value">
                                    <span>+0</span>
                                </div>
                                <div class="cb-stat__label">
                                    <span>inspiration</span>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
    export default {
        name: 'combat',
        props: ['user'],
        data() {
            return {}
        },
        methods: {
            prepared(spells) {
                return spells.filter(spell => spell.prepared || spell.ritual)
            },
            expend_spell_slot(details) {
                if (details.slots.expended + 1 <= details.slots.total) {
                    details.slots.expended++
                }
            },
            regain_spell_slot(details) {
                if (details.slots.expended - 1 >= 0) {
                    details.slots.expended--
                }
            },
            reset_spell_slots(details) {
                details.slots.expended = 0
            }
        }
    }
</script>
