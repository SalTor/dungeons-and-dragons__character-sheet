<template>
    <div class="stat">
        <div class="stat__modifier">{{ stat | modifier | sign }}</div>

        <div class="stat__name">{{ stat }}</div>
    </div>
</template>

<script>
    import Vue from 'vue'

    export default {
        name: 'user-stat',
        props: ['stat'],
        data() {
            return {}
        }
    }
</script>
