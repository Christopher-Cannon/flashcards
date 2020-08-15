<template>
  <div class="panel">
    <h2 class="panel-heading">Flashcards</h2>

    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
      Quisquam at quidem unde, officiis dolor iure commodi vitae minima.
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
  name: 'home'
}
</script>