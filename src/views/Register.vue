<template>
  <div class="panel">
    <h2 class="panel-heading">Register</h2>

    <form class="form" @submit.prevent="register">
      <label for="email">Email</label>
      <input type="email" v-model="email">

      <label for="password-one">Password</label>
      <input type="password" v-model="passwordOne">

      <label for="password-two">Retype password</label>
      <input type="password" v-model="passwordTwo">

      <input type="submit" name="submit" value="Register">

      <p class="warning-text">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { store } from '../store/store'
import { firebaseAuth } from '../firebase'

export default {
  name: 'register',
  data() {
    return {
      email: '',
      passwordOne: '',
      passwordTwo: ''
    }
  },
  computed: {
    ...mapGetters([
      'errorMessage'
    ])
  },
  methods: {
    register() {
      if (this.passwordOne !== this.passwordTwo) {
        alert("Passwords don't match!")
      } else {
        try {
          firebaseAuth.createUserWithEmailAndPassword(
            this.email,
            this.passwordOne
          ).then(() => {
            const user = {
              email: this.email,
              password: this.passwordOne
            }
            store.dispatch('signIn', user)
          })
        } catch (error) {
          console.log(error.message)
        }
      }
    }
  }
}
</script>