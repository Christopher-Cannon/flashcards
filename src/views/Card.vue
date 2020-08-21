<template>
  <div class="panel">
    <h2 class="panel-heading" v-if="cardId">Update card {{ cardId }} of {{ currentDeck }}</h2>
    <h2 class="panel-heading" v-else>Add new card to {{ currentDeck }}</h2>

    <form class="form" @submit.prevent="cardId ? cardEdit() : cardAdd()">
      <label>Front</label>
      <textarea name="front" maxlength="512" v-model="cardFront"></textarea>

      <label>Back</label>
      <textarea name="back" maxlength="512" v-model="cardBack"></textarea>

      <input type="submit" name="submit" value="Update card" v-if="cardId">
      <input type="submit" name="submit" value="Create card" v-else>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { store } from '../store/store'

export default {
  name: 'card',
  props: ['deckId', 'cardId'],
  data() {
    return {
      cardFront: '',
      cardBack: '',
      currentDeck: ''
    }
  },
  created() {
    store.dispatch('setDecksRef')
    this.getDeckName()

    if (this.cardId) {
      this.getCardData()
    }
  },
  computed: {
    ...mapGetters({
      currentDeckName: 'currentDeck',
      currentCardsStore: 'getCards',
      currentCardData: 'currentCardData'
    })
  },
  methods: {
    getDeckName() {
      return store.dispatch('getDeckName', this.deckId).then(() => {
        this.setDeckName()
      })
    },
    setDeckName() {
      this.currentDeck = this.currentDeckName
    },
    getCardData() {
      return store.dispatch('getCardData', this.cardId).then(() => {
        this.setCardData()
      })
    },
    setCardData() {
      let parsedData = JSON.parse(JSON.stringify(this.currentCardData))
      this.cardFront = parsedData.front
      this.cardBack = parsedData.back
    },
    cardAdd() {
      if (this.cardFront === '' || this.cardFront === '') {
        console.log('Card fields cannot be empty')
        return 0
      }

      const newCard = {
        deckId: this.deckId,
        front: this.cardFront,
        back: this.cardBack
      }

      store.dispatch('buildCard', newCard)
        .then(() => {
          this.$router.push({ name: 'DeckView', params: { deckId: this.deckId } })
        })
    },
    cardEdit() {
      const cardToEdit = {
        id: this.cardId,
        front: this.cardFront,
        back: this.cardBack
      }
      store.dispatch('editCard', cardToEdit)
        .then(() => {
          this.$router.push({ name: 'DeckView', params: { deckId: this.deckId } })
        })
    }
  }
}
</script>