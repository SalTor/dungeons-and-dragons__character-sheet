<template>
    <main role="main">
        <section>
            <div class="section__content">
                <article>
                    <h1>{{ user.name }}</h1>
                    <p v-for="name in classes">{{ name }}</p>
                    <br>
                    <p>{{ user.personality_trait }}</p>
                </article>

                <article>
                    <h2>Ideal</h2>
                    <p>{{ user.ideal }}</p>
                </article>

                <article>
                    <h2>Bond</h2>
                    <p>{{ user.bond }}</p>
                </article>

                <article>
                    <h2>Inspiration</h2>
                    <p>{{ user.inspiration }}</p>
                </article>

                <article>
                    <h2>Flaw</h2>
                    <p>{{ user.flaw }}</p>
                </article>
            </div>
        </section>
    </main>
</template>

<script>
    import Vue from "vue"

    export default {
        name: "background",
        props: {
            user: {
                type: Object,
                default() {
                    return {
                        classes: []
                    }
                }
            }
        },
        data() {
            return {}
        },
        computed: {
            classes() {
                const arr = this.user.classes || []
                return arr.map(({ category, description, level }) => `I am a level ${ level } ${ category }, ${ description }`)
            },
        }
    }
</script>
