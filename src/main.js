import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './routes'

Vue.config.productionTip = false

Vue.use(VueRouter)

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
  render: h => h(App),
}).$mount('#app')
