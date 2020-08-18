<template>
  <div class="panel">
    <DeckForm :deckId="deckId" />

    <div v-if="deckId">
      <h3 class="margin-top-md">List of cards</h3>

      <router-link :to="{ name: 'CardAdd' }" class="btn-primary btn-block">
        Add new card
      </router-link>

      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Front</th>
            <th>Back</th>
            <th>Controls</th>
          </tr>
        </thead>

        <tbody>
          <CardPreview />
          <CardPreview />
          <CardPreview />
        </tbody>

        <tfoot>
          <tr>
            <th>ID</th>
            <th>Front</th>
            <th>Back</th>
            <th>Controls</th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import DeckForm from '../components/DeckForm'
import CardPreview from '../components/CardPreview'

export default {
  name: 'deckView',
  components: {
    DeckForm,
    CardPreview
  },
  props: ['deckId']
}
</script>