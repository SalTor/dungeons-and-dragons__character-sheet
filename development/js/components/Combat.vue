<template>
    <main role="main">
        <section>
            <div class="section__content" v-if="!loading">
                <div class="section__description">
                    <div class="spell-book">
                        <div class="spell-book__cantrips" v-for="(cantrips, category) in user.spell_book" v-if="category === 'cantrips'">
                            <div class="cantrips__title">Cantrips:</div>

                            <div class="cantrips__spells">
                                <div class="spell" v-for="cantrip in cantrips">{{cantrip}}</div>
                            </div>
                        </div>

                        <div class="spell-book__spells" v-for="(spells, category) in user.spell_book" v-if="category === 'spells'">
                            <div class="spell-tier" v-for="(spells, category) in spells" v-if="prepared(spells).length > 0">
                                <div class="spell-tier__title">Level {{ category }}</div>

                                <div class="spell-tier__spells">
                                    <div class="spell" v-for="spell in prepared(spells)">
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
        mounted() {},
        methods: {
            spellbook(category, book) {
                return book[category]
            },
            prepared(spells) {
                return _.filter(spells, spell => spell.prepared)
            }
        }
    }
</script>
