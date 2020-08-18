<template>
  <tr>
    <td>1</td>
    <td>What is the capital of France?</td>
    <td>Paris</td>
    <td class="table-controls">
      <router-link :to="{ name: 'CardView', params: { cardId: 86 } }" class="btn-primary">
        Edit
      </router-link>
      <a href="javascript:;" class="btn-warning">Delete</a>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'cardPreview'
}
</script>