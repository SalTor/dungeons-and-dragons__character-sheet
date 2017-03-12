<template>
    <main role="main">
        <section>
            <div class="section__content">
                <h1 class="section__header">Here's some background on {{user.name}}</h1>

                <div class="field-wrapper field-wrapper_direction_vertical">

                </div>
            </div>
        </section>
    </main>
</template>

<script>
    import Vue from "vue"

    export default {
        name: "description",
        props: ["user"],
        data() {
            return {}
        }
    }
</script>
