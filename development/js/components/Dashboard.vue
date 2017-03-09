<template>
    <section>
        <div class="section__content">
            <h1 class="section__header">{{ user.name }}</h1>

            <div class="section__description">
                <div class="section__copy-block">
                    {{ user.name }} is a {{ user.sub_race }}, {{ user.class.category }}. That is, {{ user.class.description | lowercase }}.
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "app-dashboard",
        props: [ "user" ],
        data() {
            return {

            }
        }
    }
</script>
