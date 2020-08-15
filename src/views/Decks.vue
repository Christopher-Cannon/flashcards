<template>
  <div class="panel">
    <h2 class="panel-heading">My Decks</h2>

    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Quisquam at quidem unde, officiis dolor iure commodi vitae minima. Eos, quis?
    </p>

    <div class="grid cards">
      <a href="deck-add.html" class="card-new">
        <h3 class="card-title">Add new deck</h3>
      </a>
      
      <DeckPanel />
      <DeckPanel />
      <DeckPanel />
    </div>
  </div>
</template>

<script>
import DeckPanel from '../components/DeckPanel'

export default {
  name: 'decks',
  components: {
    DeckPanel
  }
}
</script>