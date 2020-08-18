<template>
  <div class="panel">
    <h2 class="panel-heading" v-if="cardId">Update card {{ cardId }} of deck {{ deckId }}</h2>
    <h2 class="panel-heading" v-else>Add new card</h2>

    <form action="deck-view.html" class="form">
      <label>Front</label>
      <textarea name="front" maxlength="512"></textarea>

      <label>Back</label>
      <textarea name="back" maxlength="512"></textarea>

      <input type="submit" name="submit" value="Update card" v-if="cardId">
      <input type="submit" name="submit" value="Create card" v-else>
    </form>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: ['deckId', 'cardId']
}
</script>