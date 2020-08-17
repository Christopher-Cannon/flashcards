<template>
  <div class="panel">
    <h2 class="panel-heading">Login</h2>

    <form class="form" @submit.prevent="signIn">
      <label>Email</label>
      <input type="email" v-model="email">

      <label>Password</label>
      <input type="password" v-model="password">

      <input type="submit" name="submit" value="Login">
    </form>

    <a href="password-reset.html" class="link">I forgot my password!</a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { store } from '../store/store'

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   console.log(store.getters.loggedIn)

  //   if (store.getters.loggedIn === null) {
  //     console.log("Not logged in")
  //     next()
  //   } else {
  //     console.log("You are already logged in")
  //     next(false)
  //   }
  // },
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },
  methods: {
    signIn() {
      const user = {
        email: this.email,
        password: this.password
      }
      store.dispatch('signIn', user)
        .then(() => this.$cookies.set('loggedIn', 'true'))
        .then(() => this.$cookies.set('userEmail', this.email))
        .then(() => this.$router.push({ name: 'Decks' }))
    }
  }
}
</script>