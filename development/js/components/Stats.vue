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

                            </div>
                        </div>

                        <div class="modifier modifier__passive-wisdom"></div>
                    </div>

                    <!--<div>Hitpoints: {{user.hitpoints.max}}/{{user.hitpoints.current}}</div>-->

                    <div>Speed: {{user.speed}}</div>

                    <div>Armor Class: {{user.armor_class}}</div>

                    <div>Level: {{user.level}}</div>

                    <div>Experience: {{user.experience}}</div>

                    <div>Hit Dice: {{user.hit_dice}}</div>

                    <div>Spell Save DC: {{user.spell_save_dc}}</div>

                    <div>Spell Attack Bonus: {{user.spell_attack_bonus}}</div>

                    <div>Primary Ability (Spellcasting ability): {{user.primary_ability}}</div>

                    <div>
                        Saving throw proficiencies
                        <ul>
                            <li v-for="proficiency in user.saving_throw_proficiencies">{{proficiency}}</li>
                        </ul>
                    </div>

                    <div v-if="user.armor_weapon_proficiencies">
                        Armor & Weapon proficiencies
                        <ul>
                            <li v-for="proficiency in user.armor_weapon_proficiencies">{{proficiency}}</li>
                        </ul>
                    </div>

                    <div>
                        Skill proficiencies
                        <ul>
                            <li v-for="proficiency in user.skill_proficiencies">{{proficiency}}</li>
                        </ul>
                    </div>

                    <div v-if="user.tool_proficiencies">
                        Tool proficiencies
                        <ul>
                            <li v-for="proficiency in user.tool_proficiencies">{{proficiency}}</li>
                        </ul>
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
            Vue.filter('sign', number => number > 0 ? `+${number}` : `${number}`)
            Vue.filter('modifier', saving_throw => {
                return this.user.saving_throw_modifiers[saving_throw]
            })
        },
        data() {
            return {}
        },
        mounted() {
        }
    }
</script>
