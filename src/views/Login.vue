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
        .then(() => this.$router.push({ name: 'Home' }))
        .then(() => this.$cookies.set('loggedIn', 'true'))
        .then(() => this.$cookies.set('userEmail', this.email))
    }
  }
}
</script>