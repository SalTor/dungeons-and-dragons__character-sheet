<template>
    <main role="main">
        <section>
            <div class="section__content section__content_extra-space-above">
                <div class="field-group field-group_direction_vertical-center" v-if="user.hitpoints">
                    <div class="hp-ac-initiative">
                        <div class="field-group field-group_direction_vertical field-group_full-width">
                            <div class="armor-class">
                                <div class="armor-class__value">{{ user.armor_class }}</div>

                                <div class="armor-class__mononym">Armor Class</div>
                            </div>

                            <div class="initiative">
                                <div class="initiative__value">{{ user.initiative_modifier | sign }}</div>

                                <div class="initiative__mononym">Initiative</div>
                            </div>
                        </div>
                    </div>

                    <div class="stats-and-modifiers__container">
                        <div class="stats-and-modifiers">
                            <div class="stats-container">
                                <user-stat v-for="(value, stat) in user.stats" :stat="stat" :key="createID()" />
                            </div>

                            <div class="modifiers-container">
                                <div class="modifier modifier_proficiency">
                                    <div class="modifier__value modifier__value_proficiency" :class="user.proficiency_bonus < 10 ? 'modifier__value_single-digit' : ''">{{ user.proficiency_bonus | sign }}</div>

                                    <div class="modifier__name modifier__name_proficiency">Proficiency Bonus</div>
                                </div>

                                <div class="modifier modifier_perception">
                                    <div class="modifier__value modifier__value_perception" :class="user.passive_wisdom < 10 ? 'modifier__value_single-digit' : ''">{{ user.passive_wisdom | sign }}</div>

                                    <div class="modifier__name modifier__name_perception">Perception</div>
                                </div>

                                <div class="modifier modifier_inspiration">
                                    <div class="modifier__value modifier__value_inspiration">{{ user.inspiration_modifier | sign }}</div>

                                    <div class="modifier__name modifier__name_inspiration">Inspiration</div>
                                </div>

                                <div class="modifier-group">
                                    <div class="modifier" v-for="(value, name) in user.skill_modifiers">
                                        <div class="modifier__value">{{ value | sign }}</div>

                                        <div class="modifier__name">{{ name }}</div>
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
        data() {
            return {}
        },
        methods: {
            proficient(stat, array) {
                return array.includes(stat)
            },
            createID() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1)
            }
        }
    }
</script>
