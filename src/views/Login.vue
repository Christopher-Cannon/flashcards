<template>
  <div class="panel">
    <h2 class="panel-heading">Login</h2>

    <form class="form" @submit.prevent="signIn">
      <label>Email</label>
      <input type="email" v-model="email">

      <label>Password</label>
      <input type="password" v-model="password">

      <input type="submit" name="submit" value="Login">

      <p class="warning-text">{{ errorMessage }}</p>
    </form>

    <router-link :to="{ name: 'PasswordReset' }" class="link">
      I forgot my password!
    </router-link>
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
      'currentUser',
      'errorMessage'
    ])
  },
  methods: {
    signIn() {
      const user = {
        email: this.email,
        password: this.password
      }
      store.dispatch('signIn', user)
    }
  }
}
</script>