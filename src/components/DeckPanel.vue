<template>
  <div class="card">
    <h3 class="card-title">{{ deck.name }}</h3>

    <p class="card-body">
      {{ cardCount }} cards
    </p>

    <div class="card-btn-group">
      <router-link :to="{ name: 'DeckView', params: { deckId: deck.id } }" class="btn-primary btn-block">
        Edit
      </router-link>
      <router-link :to="{ name: 'Review', params: { deckId: deck.id } }" class="btn-primary btn-block">
        Review
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'deckPanel',
  props: ['deck'],
  computed: {
    ...mapGetters({
      currentCardStore: 'getCards'
    }),
    cardCount: {
      get: function() {
        return this.currentCardStore.filter(card => card.deckId == this.deck.id).length
      }
    }
  }
}
</script>