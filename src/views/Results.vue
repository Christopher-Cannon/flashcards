<template>
  <div class="panel">
    <h2 class="panel-heading">Results of review session</h2>

    <router-link :to="{ name: 'Decks' }" class="btn-primary btn-block">
      Return to decks
    </router-link>

    <h3>Overview</h3>
    
    <ul class="list">
      <li>Cards reviewed: {{ results.totalReviews }}</li>
      <li>Cards passed: {{ results.totalPasses }}</li>
    </ul>

    <div v-if="results.failedCards">
      <h3>Failed cards</h3>

      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Front</th>
            <th>Back</th>
          </tr>
        </thead>

        <tbody v-for="(card, index) in results.failedCards" :key="index">
          <tr>
            <td>{{ index + 1 }}</td>
            <td>{{ card.front }}</td>
            <td>{{ card.back }}</td>
          </tr>
        </tbody>

        <tfoot v-if="results.failedCards.length > 10">
          <tr>
            <th>ID</th>
            <th>Front</th>
            <th>Back</th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'results',
  data() {
    return {
      results: {}
    }
  },
  created() {
    if (this.$cookies.isKey('reviewSession')) {
      this.results = this.$cookies.get('reviewSession')
    } else {
      this.$router.replace({ name: 'Decks' })
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.$cookies.isKey('reviewSession')) {
      this.$cookies.remove('reviewSession')
    }
    next()
  }
}
</script>