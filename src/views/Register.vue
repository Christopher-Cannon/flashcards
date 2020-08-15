<template>
  <div class="panel">
    <h2 class="panel-heading">Register</h2>

    <form class="form">
      <label for="username">Username</label>
      <input type="username">

      <label for="email">Email</label>
      <input type="email">

      <label for="password-one">Password</label>
      <input type="password-one">

      <label for="password-two">Retype password</label>
      <input type="password-two">

      <input type="submit" name="submit" value="Register">
    </form>
  </div>
</template>

<script>
export default {
  name: 'register'
}
</script>