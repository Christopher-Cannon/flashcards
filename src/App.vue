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
import { firebaseAuth } from './firebase'
import PageHeader from './components/PageHeader';

export default {
  name: 'App',
  components: {
    PageHeader
  },
  mounted() {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        store.dispatch('persistSignIn', user.email)
      }
    })
  }
}
</script>

<style>
  @import './assets/css/style.css';
  @import './assets/css/light-theme.css';
  @import './assets/css/colours.css';
</style>