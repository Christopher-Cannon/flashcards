<template>
  <div class="panel">
    <h2 class="panel-heading">Password reset</h2>

    <p>
      Enter your email address to receive a password reset link. This may take 
      a few minutes to appear. Be sure to check your spam folder in case it doesn't 
      show up straight away.
    </p>

    <p>
      Please contact us if you experience any further difficulties.
    </p>

    <form action="login.html" class="form">
      <label>Email</label>
      <input type="email">

      <input type="submit" name="submit" value="Send password reset request">
    </form>
  </div>
</template>

<script>
export default {
  name: 'passwordReset'
}
</script>