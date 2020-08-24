<template>
  <div class="panel">
    <h2 class="panel-heading">About Flashcards</h2>

    <p>
      Create decks of flashcards on any topic you want to commit to memory. Register 
      a new account or login below.
    </p>

    <p>
      More detailed information on this app, how you use it and its benefits to go here.
    </p>

    <div class="btn-group" v-if="loggedIn === null">
      <router-link :to="{ name: 'Register' }" class="btn-primary">
        Register
      </router-link>

      <router-link :to="{ name: 'Login' }" class="btn-primary">
        Login
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'about',
  computed: {
    ...mapGetters([
      'loggedIn'
    ])
  }
}
</script>