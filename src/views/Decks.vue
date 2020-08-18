<template>
  <div class="panel">
    <h2 class="panel-heading">My Decks</h2>

    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Quisquam at quidem unde, officiis dolor iure commodi vitae minima. Eos, quis?
    </p>

    <div class="grid cards">
      <router-link :to="{ name: 'DeckAdd' }" class="card-new">
        <h3 class="card-title">Add new deck</h3>
      </router-link>
      
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