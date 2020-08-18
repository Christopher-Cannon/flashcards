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
  base: '/',
  scrollBehavior(savedPosition) {
    savedPosition
      ? savedPosition
      : { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const userStatus = Vue.$cookies.get('loggedIn')
  const loggedInBlacklist = ['Login', 'Register']
  const loggedOutBlacklist = ['Decks', 'Settings', 'Review', 'Results', 'PasswordReset']

  if (loggedInBlacklist.includes(to.name) && userStatus !== null) {
    next({ name: 'Decks' })
  } else if (loggedOutBlacklist.includes(to.name) && userStatus === null) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
