import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'

import '@/assets/scss/app.scss'

Vue.config.productionTip = false

Vue.use(BootstrapVue)

new Vue({
  render: h => h(App),
}).$mount('#app')
