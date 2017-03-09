<template>
    <div id="dungeons_and_dragons__character_sheet" class="pseudo-body">
        <app-navigation></app-navigation>

        <router-view></router-view>

        <app-footer></app-footer>
    </div>
</template>

<script>
    import Vue from "vue"

    export default {
        name: 'app',
        data() {
            return {}
        }
    }
</script>