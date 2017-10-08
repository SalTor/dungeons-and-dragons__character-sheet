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
    import { bus } from '../dungeons_and_dragons_character_sheet'

    export default {
        name: 'death-save',
        props: {
            type: { type: String, required: true },
            value: { type: Number, required: true }
        },
        computed: {
            category() { return this.value === 3 ? 'reset' : this.type }
        },
        data() {
            return {
                which: this.type === 'successes' ? 'pass' : 'fail'
            }
        },
        methods: {
            update() {
                const { which, value } = this

                if(value < 3) {
                    bus.$emit(`death-saves::${ which }`)
                } else {
                    bus.$emit(`death-saves::reset-${ which }`)
                }
            }
        }
    }
</script>