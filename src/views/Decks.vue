<template>
  <div class="panel">
    <h2 class="panel-heading">My Decks</h2>

    <p>
      Create a new deck of flashcards using the button below, then add, edit and remove  
      cards in the edit page. Click review to go through that deck's cards and test your memory.
    </p>

    <div class="grid cards">
      <router-link :to="{ name: 'DeckAdd' }" class="card-new">
        <h3 class="card-title">Add new deck</h3>
      </router-link>
      
      <div v-for="(deck, index) in currentDeckStore" :key="index">
        <DeckPanel :deck="deck" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DeckPanel from '../components/DeckPanel'

export default {
  name: 'decks',
  components: {
    DeckPanel
  },
  created() {
    this.$store.dispatch('setDecksRef')
    this.$store.dispatch('setCardsRef')
  },
  computed: {
    ...mapGetters({
      currentDeckStore: 'getDecks'
    })
  }
}
</script>