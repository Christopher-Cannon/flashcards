<template>
  <div class="panel">
    <h2 class="panel-heading">Add new card</h2>

    <form action="deck-view.html" class="form">
      <label>Front</label>
      <textarea name="front" maxlength="512"></textarea>

      <label>Back</label>
      <textarea name="back" maxlength="512"></textarea>

      <input type="submit" name="submit" value="Create card">
    </form>
  </div>
</template>

<script>
export default {
  name: 'card'
}
</script>