<template>
  <div class="panel">
    <h2 class="panel-heading">Flashcards</h2>

    <p>
      Create decks of flashcards on any topic you want to commit to memory. Register 
      a new account or login below.
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
  name: 'home',
  computed: {
    ...mapGetters([
      'loggedIn'
    ])
  }
}
</script>