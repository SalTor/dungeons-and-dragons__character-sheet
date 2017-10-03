<template>
    <main role="main">
        <section>
            <div class="section__content">
                <article v-if="user.class">
                    <h1>{{ user.name }}</h1>
                    <p>Level {{ user.level }} {{ user.class.category }}, {{ user.class.description }}</p>
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
        props: ["user"],
        data() {
            return {}
        }
    }
</script>
