<template>
    <main role="main">
        <section>
            <div class="section__content">
                <h1>Welcome back, {{user.name}}.</h1>
                <div class="field-wrapper field-wrapper_direction_vertical">
                    <label for="character-name" class="input__label">Character Name</label>
                    <input id="character-name" title="Character Name"
                           :placeholder="user.name"
                           type="text" class="input input_disabled">
                </div>
            </div>
        </section>
    </main>
</template>

<script>
    import Vue from "vue"

    export default {
        name: "dashboard",
        props: ["user"],
        data() {
            return {}
        }
    }
</script>
