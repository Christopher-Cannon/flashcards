<template>
  <div class="panel">
    <h2 class="panel-heading">Reviewing "This is a deck"</h2>

    <div class="margin-v-lg center-text">
      <h3>Front</h3>

      <p>What is the capital of France?</p>

      <div>
        <hr>

        <h3>Back</h3>

        <p>Paris</p>
      </div>
    </div>

    <a href="javascript:;" class="btn-primary btn-block">Flip card</a>

    <div class="btn-group">
      <a href="javascript:;" class="btn-warning">Fail</a>
      <a href="review-results.html" class="btn-primary">Pass</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'review'
}
</script>