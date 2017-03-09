<template>
    <section v-if="intro">
        <div class="section__content">
            <h1 class="section__header">Dungeons & Dragons Character Sheet</h1>

            <div class="section__description">
                <div class="section__copy-block" v-html="intro_msg_1"></div>

                <div class="section__copy-block">
                    <p v-html="intro_msg_2"></p>

                    <ul>
                        <li v-for="item in intro_msg_2_list">{{item}}</li>
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
            return { }
        }
    }
</script>
