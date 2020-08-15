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
import PageHeader from './components/PageHeader';

export default {
  name: 'App',
  components: {
    PageHeader
  }
}
</script>