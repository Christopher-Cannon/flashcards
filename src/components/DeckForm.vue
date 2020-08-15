<template>
  <div>
    <h2 class="panel-heading">Add new deck</h2>

    <form action="deck-view.html" class="form">
      <label>Deck name</label>
      <input type="text">

      <input type="submit" name="submit" value="Create deck">
    </form>

    <a href="javascript:;" class="btn-warning btn-block">Delete deck</a>
  </div>
</template>

<script>
export default {
  name: 'deckForm'
}
</script>