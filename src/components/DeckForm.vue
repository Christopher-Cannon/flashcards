<template>
  <div>
    <h2 class="panel-heading" v-if="deckId">{{ currentDeck }}</h2>
    <h2 class="panel-heading" v-else>Add new deck</h2>

    <form class="form" @submit.prevent="deckId ? deckEdit(deckId) : deckAdd()">
      <label>Deck name</label>
      <input type="text" name="deck-name" v-model="currentDeck">

      <input type="submit" name="submit" value="Update deck" v-if="deckId">
      <input type="submit" name="submit" value="Create deck" v-else>
    </form>

    <a href="javascript:;" class="btn-warning btn-block" v-if="deckId">Delete deck</a>
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
  mounted() {
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
      currentDeckStore: 'currentDeck'
    })
  },
  methods: {
    deckNameForEditing() {
      return store.dispatch('getDeckName', this.deckId).then(() => {
        this.setDeckName()
      })
    },
    setDeckName() {
      this.currentDeck = this.currentDeckStore
    },
    deckAdd() {
      store.dispatch('buildDeck', this.currentDeck)
        .then((deckId) => {
          this.$router.push({ name: 'DeckView', params: { deckId: deckId } })
        })
    },
    deckEdit(id) {
      const deckToEdit = {
        id: id,
        deckName: this.currentDeck
      }
      store.dispatch('editDeck', deckToEdit)
    }
  }
}
</script>