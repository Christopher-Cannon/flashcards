<template>
  <div>
    <h2 class="panel-heading" v-if="deckId">{{ currentDeckName }}</h2>
    <h2 class="panel-heading" v-else>Add new deck</h2>

    <form class="form" @submit.prevent="deckId ? deckEdit() : deckAdd()">
      <label>Deck name</label>
      <input type="text" name="deck-name" v-model="currentDeck">

      <input
        type="submit"
        name="submit"
        value="Update deck"
        v-if="deckId"
        v-show="currentDeck != currentDeckName"
      >
      <input type="submit" name="submit" value="Create deck" v-else>
    </form>

    <a
      href="javascript:;"
      class="btn-warning btn-block"
      v-if="deckId"
      @click.prevent="deleteDeck()"
    >
      Delete deck
    </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { store } from '../store/store'

export default {
  name: 'deckForm',
  props: ['deckId'],
  data() {
    return {
      currentDeck: ''
    }
  },
  created() {
    // Display deck name if an ID is given
    if (this.deckId) {
      this.deckNameForEditing()
    } else {
      store.dispatch('setDeckName', null)
    }
  },
  computed: {
    // Get the name of the deck with the current deckId
    ...mapGetters({
      currentDeckName: 'currentDeck'
    })
  },
  methods: {
    deckNameForEditing() {
      return store.dispatch('getDeckName', this.deckId).then(() => {
        this.setDeckName()
      })
    },
    setDeckName() {
      this.currentDeck = this.currentDeckName
    },
    deckAdd() {
      store.dispatch('buildDeck', this.currentDeck)
        .then((deckId) => {
          this.$router.push({ name: 'DeckView', params: { deckId: deckId } })
        })
    },
    deckEdit() {
      const deckToEdit = {
        id: this.deckId,
        deckName: this.currentDeck
      }
      store.dispatch('editDeck', deckToEdit)
    },
    deleteDeck() {
      let decision = confirm(`Are you sure you want to delete ${this.currentDeck}?`)
      
      if (decision) {
        store.dispatch('deleteCardsInDeck', this.deckId)
          .then(() => {
            store.dispatch('deleteDeck', this.deckId)
              .then(() => {
                this.$router.push({ name: 'Decks' })
            })
        })
      }
    }
  }
}
</script>