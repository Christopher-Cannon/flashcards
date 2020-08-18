<template>
  <div class="card">
    <h3 class="card-title">Deck title</h3>

    <p class="card-body">
      26 cards
    </p>

    <div class="card-btn-group">
      <router-link :to="{ name: 'DeckView', params: { deckId: 13 } }" class="btn-primary btn-block">
        Edit
      </router-link>
      <router-link :to="{ name: 'Review' }" class="btn-primary btn-block">
        Review
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'deckPanel'
}
</script>