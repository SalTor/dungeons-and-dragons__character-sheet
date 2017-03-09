import Vue from "vue"
import App from "./components/App.vue"
import Navigation from "./components/Navigation.vue"
import Introduction from "./components/Introduction.vue"
import Footer from "./components/Footer.vue"
import Dashboard from "./components/Dashboard.vue"

Vue.component('app-navigation', Navigation)
Vue.component('app-introduction', Introduction)
Vue.component('app-footer', Footer)
Vue.component('app-dashboard', Dashboard)

new Vue({
    el: '#dungeons_and_dragons__character_sheet',
    render: h => h(App)
})
