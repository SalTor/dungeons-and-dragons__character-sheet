import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './components/App.vue'

import NotFound  from './components/NotFound.vue'

import Combat    from './components/Combat.vue'
import Inventory from './components/Inventory.vue'
import Stats     from './components/Stats.vue'
import Spellbook from './components/Spellbook.vue'
import Background from './components/Background.vue'
import Intro      from './components/Introduction.vue'


require('../../node_modules/normalize.css/normalize.css')
require('../scss/dungeons_and_dragons_character_sheet.scss')

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/',            component: Intro },
        { path: '/combat',      component: Combat },
        { path: '/inventory',   component: Inventory },
        { path: '/stats',       component: Stats },
        { path: '/spellbook',   component: Spellbook },
        { path: '/background',  component: Background },
        { path: '*',            component: NotFound }
    ],
    base: __dirname + 'public'
})

export const bus = new Vue()

new Vue({
    el: '#dungeons_and_dragons__character_sheet',
    router,
    render: h => h(App)
})