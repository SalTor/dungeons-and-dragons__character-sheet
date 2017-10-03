<template>
    <div class="item" @click="viewItem">
        <div class="item__name">{{ details.name }}</div>
    </div>
</template>

<script>
    import { mixin as clickaway } from 'vue-clickaway'

    export default {
        name: 'item',
        mixins: [ clickaway ],
        props: {
            details: { type: Object, required: true }
        },
        data() {
            return {}
        },
        methods: {
            viewItem() {
                this.$emit('view', this.details)
            }
        }
    }
</script>
