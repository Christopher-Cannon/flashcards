<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>{{ card.front }}</td>
    <td>{{ card.back }}</td>
    <td class="table-controls">
      <router-link :to="{ name: 'CardView', params: { cardId: card.id } }" class="btn-primary">
        Edit
      </router-link>
      <a href="javascript:;" class="btn-warning">Delete</a>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'cardPreview',
  props: ['card', 'index']
}
</script>