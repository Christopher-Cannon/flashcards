<template>
  <div class="panel">
    <h2 class="panel-heading">Results of review session</h2>

    <a href="decks.html" class="btn-primary btn-block">Return to decks</a>

    <h3>Overview</h3>
    
    <ul class="list">
      <li>Cards reviewed: 40</li>
      <li>Correct cards: 38</li>
    </ul>

    <h3>Failed cards</h3>

    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Front</th>
          <th>Back</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>1</td>
          <td>What is the capital of France?</td>
          <td>Paris</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Now I am going to ask a very long question that probably won't fit inside the box</td>
          <td>This answer is also going to be very long to the extent that it will barely fit</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'results'
}
</script>