<template>
  <div class="panel">
    <h2 class="panel-heading">About Flashcards</h2>

    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Quisquam at quidem unde, officiis dolor iure commodi vitae minima. Eos, quis?
    </p>

    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor tempora, rerum 
      neque assumenda quidem quis sequi numquam optio dolores quia delectus nostrum 
      istinctio excepturi illum expedita id. Assumenda distinctio perferendis, 
      fugit, eligendi minus expedita eius suscipit sunt illum mollitia quisquam 
      omnis. Dignissimos, veritatis!
    </p>

    <router-link :to="{ name: 'Register' }" tag="span">
      <a class="btn-primary">Register</a>
    </router-link>

    <router-link :to="{ name: 'Login' }" tag="span">
      <a class="btn-primary">Login</a>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'about'
}
</script>