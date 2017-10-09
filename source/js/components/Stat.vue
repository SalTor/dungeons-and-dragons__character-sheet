<template>
    <div class="stat">
        <div class="stat__modifier">{{ value | sign }}</div>

        <div class="stat__name">{{ name }}</div>
    </div>
</template>

<script>
    import Vue from 'vue'

    export default {
        name: 'user-stat',
        props: {
            name:  { type: String, required: true },
            value: { type: Number, required: true }
        },
        data() {
            return {}
        }
    }
</script>
