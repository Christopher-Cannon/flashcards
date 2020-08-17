<template>
  <header class="page-header">
    <nav class="page-block">
      <a 
        href="javascript:;"
        class="mobile-navigation-btn show-lt-md"
        id="mobile-navigation-btn"
        onclick="toggleNavigation();"
      >
        <i class="fas fa-bars"></i>
      </a>

      <ul class="page-navigation show-gt-md" id="page-navigation">
        <router-link :to="{ name: 'Home' }" tag="li">
          <a>Home</a>
        </router-link>

        <router-link :to="{ name: 'Decks' }" tag="li" v-if="loggedIn !== null">
          <a>My Decks</a>
        </router-link>

        <router-link :to="{ name: 'Settings' }" tag="li" v-if="loggedIn !== null">
          <a>My Settings</a>
        </router-link>

        <router-link :to="{ name: 'About' }" tag="li">
          <a>About Flashcards</a>
        </router-link>

        <li v-if="loggedIn !== null">
          <a href="javascript:;" @click.prevent="signOut">Logout</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import { store } from '../store/store'

export default {  
  name: 'pageHeader',
    computed: {
    ...mapGetters([
      'loggedIn'
    ])
  },
  methods: {
    signOut() {
      store.dispatch('signOut')
        .then(() => this.$cookies.remove('loggedIn'))
        .then(() => this.$cookies.remove('userEmail'))
    }
  }
}
</script>