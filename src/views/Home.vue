<template>
  <div class="panel">
    <h2 class="panel-heading">Flashcards</h2>

    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
      Quisquam at quidem unde, officiis dolor iure commodi vitae minima.
    </p>

    <div class="btn-group">
      <router-link :to="{ name: 'Register' }" class="btn-primary">
        Register
      </router-link>

      <router-link :to="{ name: 'Login' }" class="btn-primary">
        Login
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>