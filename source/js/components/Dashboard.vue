<template>
    <main role="main">
        <section>
            <div class="section__content">
                <h1>Welcome back, {{user.name}}.</h1>
                <div class="field-wrapper field-wrapper_direction_vertical">
                    <label for="character-name" class="input__label">Character Name</label>
                    <input :placeholder="user.name" id="character-name" title="Character Name" type="text" class="input">
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
