import Vue from "vue"
import VueRouter from "vue-router"

import App from "./components/App.vue"
import Navigation from "./components/Navigation.vue"
import Footer from "./components/Footer.vue"

import NotFound from "./components/NotFound.vue"
import Dashboard from "./components/Dashboard.vue"

import Combat from "./components/Combat.vue"
import Inventory from "./components/Inventory.vue"
import Stats from "./components/Stats.vue"


require('../../node_modules/normalize.css/normalize.css')
require('../scss/dungeons_and_dragons_character_sheet.scss')

Vue.component('app-navigation', Navigation)
Vue.component('app-footer', Footer)

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/', component: Dashboard },
        { path: '/dashboard', component: Dashboard },
        { path: '/combat',      component: Combat },
        { path: '/inventory',   component: Inventory },
        { path: '/stats',       component: Stats },
        { path: '*', component: NotFound }
    ],
    base: __dirname + 'public'
})

new Vue({
    el: '#dungeons_and_dragons__character_sheet',
    router,
    render: h => h(App)
})
