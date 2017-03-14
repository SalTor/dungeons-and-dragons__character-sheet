<template>
    <main role="main">
        <section>
            <div class="section__content section__content_extra-space-above">
                <div class="field-group field-group_direction_vertical-center">
                    <div class="hp-ac-initiative">
                        <div class="hitpoints">
                            <svg class="hitpoints__icon" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100">
                                <path fill-opacity="0" stroke-width="1" stroke="#bbb" d="M81.495,13.923c-11.368-5.261-26.234-0.311-31.489,11.032C44.74,13.612,29.879,8.657,18.511,13.923  C6.402,19.539,0.613,33.883,10.175,50.804c6.792,12.04,18.826,21.111,39.831,37.379c20.993-16.268,33.033-25.344,39.819-37.379  C99.387,33.883,93.598,19.539,81.495,13.923z"/>
                                <path id="heart-path" fill-opacity="0" stroke-width="4" stroke="#ED6A5A" d="M81.495,13.923c-11.368-5.261-26.234-0.311-31.489,11.032C44.74,13.612,29.879,8.657,18.511,13.923  C6.402,19.539,0.613,33.883,10.175,50.804c6.792,12.04,18.826,21.111,39.831,37.379c20.993-16.268,33.033-25.344,39.819-37.379  C99.387,33.883,93.598,19.539,81.495,13.923z"/>
                            </svg>
                            <div class="hitpoints__value">{{ user.hitpoints.max }}</div>
                        </div>

                        <div class="field-group field-group_direction_vertical">
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
                                <div class="stat" v-for="(value, stat) in user.stats">
                                    <div class="stat__name">{{ stat }}</div>

                                    <div class="field-group">
                                        <div class="stat__value"><span>{{ value }}</span></div>

                                        <div class="stat__modifier">{{ stat | modifier | sign }}</div>
                                    </div>
                                </div>
                            </div>

                            <div class="modifiers-container">
                                <div class="modifier modifier_perception">
                                    <div class="modifier__state modifier__state_special">
                                        <i class="fa fa-star"></i>
                                    </div>
                                    <div class="modifier__value modifier__value_perception">{{ user.passive_wisdom | sign }}</div>
                                    <div class="modifier__name modifier__name_proficiency">Perception</div>
                                </div>

                                <div class="modifier modifier_inspiration">
                                    <div class="modifier__state modifier__state_special">
                                        <i class="fa fa-star"></i>
                                    </div>
                                    <div class="modifier__value modifier__value_inspiration">{{ user.inspiration_modifier | sign }}</div>
                                    <div class="modifier__name modifier__name_inspiration">Inspiration</div>
                                </div>

                                <div class="modifier modifier_proficiency">
                                    <div class="modifier__state modifier__state_special">
                                        <i class="fa fa-star"></i>
                                    </div>
                                    <div class="modifier__value modifier__value_proficiency">{{ user.proficiency_bonus | sign }}</div>
                                    <div class="modifier__name modifier__name_proficiency">Proficiency Bonus</div>
                                </div>

                                <div class="modifier-group">
                                    <div class="modifier" v-for="(value, name) in user.saving_throw_modifiers">
                                        <div class="modifier__state"
                                            :class="proficient(name) ? 'modifier__state_active' : ''"></div>
                                        <div class="modifier__value">{{ value | sign }}</div>
                                        <div class="modifier__name">{{ name }}</div>
                                    </div>
                                </div>

                                <div class="modifier-group">
                                    <div class="modifier" v-for="(value, name) in user.skill_modifiers">
                                        <div class="modifier__state"
                                             :class="proficient(name) ? 'modifier__state_active' : ''"></div>
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
    import Vue from "vue"

    let ProgressBar = require('progressbar.js')

    export default {
        name: "stats",
        props: ["user"],
        data() {
            return {}
        },
        methods: {
            proficient(stat) {
                return this.user.saving_throw_proficiencies.includes(stat) || this.user.skill_proficiencies.includes(stat)
            }
        },
        created() {
            Vue.filter('sign', number => number >= 0 ? `+${number}` : `${number}`)
            Vue.filter('modifier', saving_throw => this.user.saving_throw_modifiers[saving_throw])
        },
        mounted() {
            this.$nextTick(function () {
                window.onload = function () {
                    let bar = new ProgressBar.Path(document.getElementById("heart-path"), {
                        strokeWidth: 2,
                        easing: 'easeInOut',
                        duration: 1400,
                        color: '#9fffcc',
                        trailColor: '#eee',
                        trailWidth: 1,
                        svgStyle: { width: '100%', height: '100%' },
                        from: { color: '#16A085' },
                        to:   { color: '#e25d26' },
                        step: (state, bar) => {
                            bar.path.setAttribute('stroke', state.color);
                        }
                    })

                    bar.animate(1)
                }
            })
        }
    }
</script>
