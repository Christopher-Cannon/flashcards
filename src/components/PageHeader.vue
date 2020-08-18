<template>
  <header class="page-header">
    <nav class="page-block">
      <a 
        href="javascript:;"
        class="mobile-navigation-btn show-lt-md"
        @click.prevent="toggleNav"
      >
        <i class="fas" :class="[ showNav ? 'fa-times' : 'fa-bars' ]"></i>
      </a>

      <ul class="page-navigation" :class="[ showNav ? '' : 'show-gt-md' ]" @click="hideNav">
        <li>
          <router-link :to="{ name: 'Home' }">
            Home
          </router-link>
        </li>

        <li v-if="loggedIn !== null">
          <router-link :to="{ name: 'Decks' }">
            My Decks
          </router-link>
        </li>

        <li v-if="loggedIn !== null">
          <router-link :to="{ name: 'Settings' }">
            My Settings
          </router-link>
        </li>

        <li>
          <router-link :to="{ name: 'About' }">
            About Flashcards
          </router-link>
        </li>

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
  data() {
    return {
      showNav: false
    }
  },
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
        .then(() => {
          // Don't redirect if we're already on the home page
          if (this.$route.name !== 'Home') {
            this.$router.push({ name: 'Home' })
          }
      })
    },
    toggleNav() {
      this.showNav = !this.showNav
    },
    hideNav() {
      this.showNav = false
    }
  }
}
</script>