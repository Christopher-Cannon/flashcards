<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>{{ card.front }}</td>
    <td>{{ card.back }}</td>
    <td class="table-controls">
      <router-link :to="{ name: 'CardView', params: { deckId: deckId, cardId: card.id } }" class="btn-primary">
        Edit
      </router-link>
      <a href="javascript:;" class="btn-warning" @click.prevent="deleteCard(card.id, index)">Delete</a>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'cardPreview',
  props: ['deckId', 'card', 'index'],
  methods: {
    deleteCard: (cardId, index) => {
      console.log(`Delete card ${cardId}`)
      let decision = confirm(`Are you sure you want to delete card ${index + 1}?`)
      
      if (decision) {
        console.log(decision)
      }
    }
  }
}
</script>