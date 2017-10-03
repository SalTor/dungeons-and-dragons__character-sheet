<template>
    <article class="death-saves" @click="update">
        <div class="death-saves__markers" :class="type">
            <span class="death-saves__marker" :class="{ marked: value >= 1 }"></span>
            <span class="death-saves__marker" :class="{ marked: value >= 2 }"></span>
            <span class="death-saves__marker" :class="{ marked: value === 3 }"></span>
        </div>
        <span class="death-saves__category">{{ category }}</span>
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
        computed: {
            category() {
                return this.value === 3 ? 'reset' : this.type
            }
        },
        data() {
            return {
            }
        },
        methods: {
            update() {
                if(this.value < 3) {
                    this.$emit('update')
                } else {
                    this.$emit('reset')
                }
            }
        }
    }
</script>