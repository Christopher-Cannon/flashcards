<template>
  <div class="panel">
    <DeckForm :deckId="deckId" />

    <div v-if="deckId">
      <h3 class="margin-top-md">List of cards</h3>

      <router-link :to="{ name: 'CardAdd' }" class="btn-primary btn-block">
        Add new card
      </router-link>

      <table class="table" v-if="cardCount > 0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Front</th>
            <th>Back</th>
            <th>Controls</th>
          </tr>
        </thead>

        <tbody v-for="(card, index) in cards" :key="index">
          <CardPreview :card="card" :index="index" />
        </tbody>

        <tfoot v-if="cardCount > 10">
          <tr>
            <th>ID</th>
            <th>Front</th>
            <th>Back</th>
            <th>Controls</th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DeckForm from '../components/DeckForm'
import CardPreview from '../components/CardPreview'

export default {
  name: 'deckView',
  components: {
    DeckForm,
    CardPreview
  },
  props: ['deckId'],
  created() {
    this.$store.dispatch('setCardsRef')
  },
  computed: {
    ...mapGetters({
      currentCardStore: 'getCards'
    }),
    cardCount: {
      get: function() {
        return this.currentCardStore.filter(card => card.deckId == this.deckId).length
      }
    },
    cards: {
      get: function() {
        return this.currentCardStore.filter(card => card.deckId == this.deckId)
      }
    }
  }
}
</script>