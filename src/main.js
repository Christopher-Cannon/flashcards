import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
import { routes } from './routes'
import { store } from './store/store'
import { firebaseAuth } from './firebase'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueCookies)

Vue.$cookies.config('30d')

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
  const loggedInBlacklist = ['Login', 'Register', 'PasswordReset']
  const loggedOutBlacklist = ['Decks', 'Settings', 'Review', 'Results']

  firebaseAuth.onAuthStateChanged(user => {
    if (loggedInBlacklist.includes(to.name) && user) {
      next({ name: 'Decks' })
    } else if (loggedOutBlacklist.includes(to.name) && !user) {
      next({ name: 'Home' })
    } else {
      next()
    }
  })
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
