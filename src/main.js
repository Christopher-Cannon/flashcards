import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
import { routes } from './routes'
import { store } from './store/store'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueCookies)

Vue.$cookies.config('3d')

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior(savedPosition) {
    savedPosition
      ? savedPosition
      : { x: 0, y: 0 }
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
