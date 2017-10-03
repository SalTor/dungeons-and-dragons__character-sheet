<template>
    <div class="item-view" v-on-clickaway="closeView">
        <h1>{{ details.name }} x {{ details.amount }}</h1>
    </div>
</template>

<script>
    import { mixin as clickaway } from 'vue-clickaway'

    export default {
        name: 'item-view',
        mixins: [clickaway],
        props: {
            details: { type: Object, required: true }
        },
        methods: {
            closeView() {
                this.$emit('close')
            }
        }
    }
</script>