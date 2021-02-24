import Vue from 'vue'
import App from './App.vue'
import VueAlertify from 'vue-alertify';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
 
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAlertify);

new Vue({
    render: h => h(App)
}).$mount('#app')
