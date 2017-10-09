<template>
    <main role="main">
        <section>
            <div class="section__content">
                <div class="stats" v-if="stats_are_prepared">
                    <div class="stats__primary">
                        <div class="stats__saving-throws">
                            <h2>Saving throws</h2>

                            <div class="stats-container">
                                <user-stat v-for="(value, stat) in saving_throws" :name="stat" :value="value" :key="stat" />
                            </div>
                        </div>

                        <div class="stats__combat">
                            <h2>Combat</h2>

                            <div class="stats-container">
                                <user-stat name="Proficiency bonus" :value="proficiency_bonus" />
                                <user-stat name="Perception" :value="passive_wisdom" />
                            </div>
                        </div>
                    </div>

                    <div class="stats__skills">
                        <h2>Skills</h2>

                        <div class="stats-container">
                            <user-stat v-for="(value, skill) in skills" :name="skill" :value="value" :key="skill" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <transition name="fade">

        </transition>
    </main>
</template>

<script>
    import Vue from 'vue'
    import Stat from './Stat.vue'

    export default {
        name: 'stats',
        props: {
            user: { type: Object, required: true }
        },
        components: {
            'user-stat': Stat
        },
        computed: {
            stats_are_prepared() { return this.proficiency_bonus && this.passive_wisdom && this.saving_throws && this.skills },
            proficiency_bonus() { return this.user.proficiency_bonus || null },
            passive_wisdom() { return this.user.passive_wisdom || null },
            saving_throws() { return this.user.saving_throw_modifiers || null },
            skills() { return this.user.skill_modifiers || null  }
        },
        data() {
            return {}
        },
        methods: {
            proficient(stat, array) {
                return array.includes(stat)
            }
        }
    }
</script>
