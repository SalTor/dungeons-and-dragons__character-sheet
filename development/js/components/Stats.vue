<template>
    <main role="main">
        <section>
            <div class="section__content">
                <h1 class="section__header">Here's the run down.</h1>

                <div class="field-wrapper field-wrapper_direction_vertical">
                    <div class="stats-and-modifiers__container">
                        <div class="stats-and-modifiers">
                            <div class="stats-container">
                                <div class="stat" v-for="(value, stat) in character.stats">
                                    <div class="stat__name">{{ stat }}</div>

                                    <div class="stat__value">
                                        <span>{{ value }}</span>
                                    </div>

                                    <div class="stat__modifier">
                                        {{ modifier(stat) }}
                                    </div>
                                </div>
                            </div>

                            <div class="modifiers-container">

                            </div>
                        </div>

                        <div class="modifier modifier__passive-wisdom"></div>
                    </div>

                    <!--<div>Hitpoints: {{character.hitpoints.max}}/{{character.hitpoints.current}}</div>-->

                    <div>Speed: {{character.speed}}</div>

                    <div>Armor Class: {{character.armor_class}}</div>

                    <div>Level: {{character.level}}</div>

                    <div>Experience: {{character.experience}}</div>

                    <div>Hit Dice: {{character.hit_dice}}</div>

                    <div>Spell Save DC: {{character.spell_save_dc}}</div>

                    <div>Spell Attack Bonus: {{character.spell_attack_bonus}}</div>

                    <div>Primary Ability (Spellcasting ability): {{character.primary_ability}}</div>

                    <div>
                        Saving throw proficiencies
                        <ul>
                            <li v-for="proficiency in character.saving_throw_proficiencies">{{proficiency}}</li>
                        </ul>
                    </div>

                    <div v-if="character.armor_weapon_proficiencies">
                        Armor & Weapon proficiencies
                        <ul>
                            <li v-for="proficiency in character.armor_weapon_proficiencies">{{proficiency}}</li>
                        </ul>
                    </div>

                    <div>
                        Skill proficiencies
                        <ul>
                            <li v-for="proficiency in character.skill_proficiencies">{{proficiency}}</li>
                        </ul>
                    </div>

                    <div v-if="character.tool_proficiencies">
                        Tool proficiencies
                        <ul>
                            <li v-for="proficiency in character.tool_proficiencies">{{proficiency}}</li>
                        </ul>
                    </div>
                    <button class="button" v-on:click="test_me()">Click Me</button>
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
            Vue.filter('sign', number => number >= 0 ? `+${number}` : `${number}`)
        },
        data() {
            return {
                character: Object.assign({}, this.user)
            }
        },
        methods: {
            modifier() {
                console.log(this.character.saving_throw_modifiers)
//                this.character.saving_throw_modifiers.map(modifier => {
//                    console.log(modifier)
//                })
//                this.character.skill_modifiers.map(modifier => {
//                    console.log(modifier)
//                })
            },
            test_me() {
                console.log(`character`, this.character)
                console.log(`user`, this.user)
                this.user.map(attribute => {
                    console.log(attribute)
                })
            }
        }
    }
</script>
