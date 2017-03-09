<template>
    <section>
        <h1>Introduction</h1>
        <div class="section__content">
            <h1 class="section__header">Dungeons & Dragons Character Sheet</h1>

            <div class="section__description">
                <div class="section__copy-block" v-html="message__introduction_1"></div>

                <div class="section__copy-block">
                    <p v-html="message__introduction_2"></p>

                    <ul>
                        <li v-for="item in message__introduction_2_list">{{item}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'app-introduction',
        props: [ "intro", "intro_msg_1", "intro_msg_2", "intro_msg_2_list" ],
        data(){
            return {
                message__introduction_1: "Broadly speaking, this is the front-end of a service to manage Dungeons and Dragons character sheets.",
                message__introduction_2: "<strong>More specifically,</strong> this is the front-end of a service to manage Dungeons and Dragons character information. This includes, but will not be limited to:",
                message__introduction_2_list: [ "Stats", "Name", "Alignment", "Inventory", "Experience", "Saving throws" ]
            }
        }
    }
</script>
