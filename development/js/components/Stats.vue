<template>
    <main role="main">
        <section>
            <div class="section__content">
                <h1 class="section__header">Here's the run down.</h1>

                <div class="field-wrapper field-wrapper_direction_vertical">
                    <div class="stats-and-modifiers__container">
                        <div class="stats-and-modifiers">
                            <div class="stats-container">
                                <div class="stat" v-for="(value, stat) in user.stats">
                                    <div class="stat__name">{{ stat }}</div>

                                    <div class="stat__value"><span>{{ value }}</span></div>

                                    <div class="stat__modifier">{{ stat | modifier | sign }}</div>
                                </div>
                            </div>

                            <div class="modifiers-container">
                                <div class="modifier modifier_inspiration">
                                    <div class="modifier__value modifier__value_inspiration">{{ user.inspiration_modifier | sign }}</div>
                                    <div class="modifier__name modifier__name_inspiration">Inspiration</div>
                                </div>

                                <div class="modifier modifier_proficiency">
                                    <div class="modifier__value modifier__value_proficiency">{{ user.proficiency_bonus | sign }}</div>
                                    <div class="modifier__name modifier__name_proficiency">Proficiency Bonus</div>
                                </div>
                            </div>
                        </div>

                        <div class="modifier modifier__passive-wisdom"></div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
    import Vue from "vue"

    export default {
        name: "stats",
        props: ["user"],
        created() {
            Vue.filter('sign', number => number > 0 ? `+${number}` : number === 0 ? ` 0` : `${number}`)
            Vue.filter('modifier', saving_throw => this.user.saving_throw_modifiers[saving_throw])
        },
        data() {
            return {}
        },
        mounted() {
        }
    }
</script>
