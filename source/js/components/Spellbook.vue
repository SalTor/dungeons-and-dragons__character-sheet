<template>
    <main role="main">
        <section>
            <div class="section__content">
                <h1>Spellbook</h1>

                <ol>
                    <li v-for="spell in spells">
                        <div class="spell-book__spell --spell-book">{{ spell }}</div>
                    </li>
                </ol>
            </div>
        </section>
    </main>
</template>

<script>
    import Vue from "vue"

    export default {
        name: "spellbook",
        props: {
            user: {
                type: Object,
                default() {
                    return {
                        spell_book: {
                            cantrips: [],
                            spells: {}
                        }
                    }
                }
            }
        },
        computed: {
            spells() {
                const spell_book = this.user.hasOwnProperty('spell_book')

                return spell_book ? this.aggregate_spells() : null
            },
        },
        data() {
            return {}
        },
        methods: {
            aggregate_spells() {
                const spell_book = this.user.spell_book.spells
                const categories = Object.keys(spell_book)
                const spells = [...this.user.spell_book.cantrips]

                categories.forEach((cat_id) => {
                    const category = spell_book[cat_id].entries
                    const spell_names = category.map(({ name }) => name)

                    spells.push(...spell_names)
                })

                return spells.sort()
            },
        },
    }
</script>
