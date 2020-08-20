<template>
  <div class="panel">
    <h2 class="panel-heading" v-if="cardId">Update card {{ cardId }} of deck {{ deckId }}</h2>
    <h2 class="panel-heading" v-else>Add new card</h2>

    <form class="form" @submit.prevent="cardId ? cardEdit(cardId) : cardAdd()">
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
// import { mapGetters } from 'vuex'
import { store } from '../store/store'

export default {
  name: 'card',
  props: ['deckId', 'cardId'],
  data() {
    return {
      cardFront: '',
      cardBack: ''
    }
  },
  methods: {
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
        .then((deckId) => {
          this.$router.push({ name: 'DeckView', params: { deckId: deckId } })
        })
    },
    cardEdit(id) {
      console.log(`Edit card ${id}`)
    }
  }
}
</script>