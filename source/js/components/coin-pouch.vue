<template>
    <div class="coin-pouch">
        <div class="coin__bundle" v-for="(amount, type) in coins">
            <span class="coin__amount">{{ amount }}</span>
            <span class="coin__type">{{ type }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            coins: { type: Object, required: true }
        },
        data() {
            return {}
        }
    }
</script>