<template>
  <div id="app">
    <PageHeader />

    <main class="page-content">
      <div class="page-block">
        <router-view @dark-mode-toggled="applyDarkMode()"></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import { store } from './store/store'
import { firebaseAuth } from './firebase'
import PageHeader from './components/PageHeader';

export default {
  name: 'App',
  components: {
    PageHeader
  },
  created() {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        // Set user logged in flag in state
        store.dispatch('persistSignIn', user.email)
        // Set names of user collections
        store.dispatch('setDecksDBName')
        store.dispatch('setCardsDBName')
      }
    })
    this.applyDarkMode()
  },
  methods: {
    applyDarkMode() {
      let root = document.documentElement
      // This is awful
      if (this.$cookies.isKey('darkMode')) {
        root.style.setProperty('--fg-primary', 'hsl(0, 0%, 99%)')
        root.style.setProperty('--fg-secondary', 'hsl(0, 0%, 93%)')
        root.style.setProperty('--bg-primary', 'hsl(0, 0%, 15%)')
        root.style.setProperty('--bg-secondary', 'hsl(0, 0%, 20%)')

        root.style.setProperty('--accent-pale', 'hsl(224, 100%, 75%)')
        root.style.setProperty('--accent-strong', 'hsl(224, 100%, 65%)')
        root.style.setProperty('--warning-pale', 'hsl(355, 75%, 63%)')
        root.style.setProperty('--warning-strong', 'hsl(355, 75%, 53%)')

        root.style.setProperty('--shadow', 'transparent')
        root.style.setProperty('--shadow-darker', 'transparent')
        root.style.setProperty('--dark-mode-border', 'hsl(224, 100%, 75%)')
      } else {
        root.style.setProperty('--fg-primary', 'hsl(0, 0%, 15%)')
        root.style.setProperty('--fg-secondary', 'hsl(0, 0%, 20%)')
        root.style.setProperty('--bg-primary', 'hsl(0, 0%, 99%)')
        root.style.setProperty('--bg-secondary', 'hsl(0, 0%, 93%)')

        root.style.setProperty('--accent-pale', 'hsl(224, 100%, 80%)')
        root.style.setProperty('--accent-strong', 'hsl(224, 100%, 70%)')
        root.style.setProperty('--warning-pale', 'hsl(355, 100%, 80%)')
        root.style.setProperty('--warning-strong', 'hsl(355, 100%, 70%)')

        root.style.setProperty('--shadow', 'hsla(0, 0%, 50%, 0.15)')
        root.style.setProperty('--shadow-darker', 'hsla(0, 0%, 50%, 0.3)')
        root.style.setProperty('--dark-mode-border', 'transparent')
      }
    }
  }
}
</script>

<style>
  @import './assets/css/style.css';
  @import './assets/css/colours.css';

  /* Light theme vars */
  :root {
    --fg-primary: hsl(0, 0%, 15%);
    --fg-secondary: hsl(0, 0%, 20%);
    --bg-primary: hsl(0, 0%, 99%);
    --bg-secondary: hsl(0, 0%, 93%);
    --accent-pale: hsl(210, 100%, 83%);
    --accent-strong: hsl(210, 100%, 73%);
    --warning-pale: hsl(355, 100%, 83%);
    --warning-strong: hsl(355, 100%, 73%);
    --shadow: hsla(0, 0%, 50%, 0.15);
    --shadow-darker: hsla(0, 0%, 50%, 0.3);
    --dark-mode-border: transparent;
  }
</style>