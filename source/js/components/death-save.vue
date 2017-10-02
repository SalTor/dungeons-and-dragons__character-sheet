<template>
    <article class="death-saves" @click="update">
        <div class="death-saves__markers" :class="type">
            <span class="death-saves__marker" :class="{ marked: value >= 1 }"></span>
            <span class="death-saves__marker" :class="{ marked: value >= 2 }"></span>
            <span class="death-saves__marker" :class="{ marked: value === 3 }"></span>
        </div>
        <span class="death-saves__category">{{ type }}</span>
    </article>
</template>

<script>
    export default {
        name: 'death-save',
        props: {
            type: {
                type: String,
                required: true
            },
            value: {
                type: Number,
                required: true
            }
        },
        data() {
            return {}
        },
        methods: {
            update() {
                this.$emit('update')
            }
        }
    }
</script>