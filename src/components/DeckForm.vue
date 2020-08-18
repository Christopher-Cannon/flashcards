<template>
  <div>
    <div v-if="deckId">
      <h2 class="panel-heading">Edit deck {{ deckId }}</h2>

      <form action="deck-view.html" class="form">
        <label>Deck name</label>
        <input type="text">

        <input type="submit" name="submit" value="Update deck">
      </form>

      <a href="javascript:;" class="btn-warning btn-block">Delete deck</a>
    </div>

    <div v-else>
      <h2 class="panel-heading">Add new deck</h2>

      <form action="deck-view.html" class="form">
        <label>Deck name</label>
        <input type="text">

        <input type="submit" name="submit" value="Create deck">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'deckForm',
  props: ['deckId']
}
</script>