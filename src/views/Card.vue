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
      console.log(`Add card`)
    },
    cardEdit(id) {
      console.log(`Edit card ${id}`)
    }
  }
}
</script>