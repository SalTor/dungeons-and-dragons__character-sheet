<template>
    <main role="main">
        <section>
            <div class="section__content">
                <h1>Welcome back, {{ user.name }}.</h1>
            </div>
        </section>
    </main>
</template>

<script>
    import Vue from "vue"

    export default {
        name: "introduction",
        props: ["user"],
        data() {
            return {}
        }
    }
</script>
