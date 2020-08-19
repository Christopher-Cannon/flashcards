<template>
  <div>
    <h2 class="panel-heading" v-if="deckId">Edit deck {{ deckId }}</h2>
    <h2 class="panel-heading" v-else>Add new deck</h2>

    <form class="form" @submit.prevent="deckId ? deckEdit(deckId) : deckAdd()">
      <label>Deck name</label>
      <input type="text" name="deck-name" v-model="deckName">

      <input type="submit" name="submit" value="Update deck" v-if="deckId">
      <input type="submit" name="submit" value="Create deck" v-else>
    </form>

    <a href="javascript:;" class="btn-warning btn-block" v-if="deckId">Delete deck</a>
  </div>
</template>

<script>
import { store } from '../store/store'

export default {
  name: 'deckForm',
  props: ['deckId'],
  data() {
    return {
      deckName: ''
    }
  },
  methods: {
    deckAdd() {
      store.dispatch('buildDeck', this.deckName)
    },
    deckEdit(id) {
      const deckToEdit = {
        id: id,
        deckName: this.deckName
      }

      store.dispatch('editDeck', deckToEdit)
    }
  }
}
</script>