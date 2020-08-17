<template>
  <div id="app">
    <PageHeader />

    <main class="page-content">
      <div class="page-block">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import { store } from './store/store'
import PageHeader from './components/PageHeader';

export default {
  name: 'App',
  components: {
    PageHeader
  },
  mounted() {
    // Check if a cookie was stored from a previous login
    // Prevents logout if page is refreshed
    if (this.$cookies.isKey('loggedIn')) {
      store.dispatch('signInFromCookie', this.$cookies.get('userEmail'))
    }

  //   this.$router.beforeEach((to, from, next) => {
  //   console.log(`loggedIn: ${store.getters.loggedIn}`)
  //   console.log(`to: ${to.name}`)

  //   if ((to.name === 'Login' || to.name === 'Register') && store.getters.loggedIn !== null) {
  //     next({ name: 'Home' })
  //   } else {
  //     next()
  //   }
  // })
  }
}
</script>