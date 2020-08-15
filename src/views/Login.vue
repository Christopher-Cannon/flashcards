<template>
  <div class="panel">
    <h2 class="panel-heading">Login</h2>

    <form class="form">
      <label>Email</label>
      <input type="email">

      <label>Password</label>
      <input type="password">

      <input type="submit" name="submit" value="Login">
    </form>

    <a href="password-reset.html" class="link">I forgot my password!</a>
  </div>
</template>

<script>
export default {
  name: 'login'
}
</script>