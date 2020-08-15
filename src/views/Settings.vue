<template>
  <div class="panel">
    <h2 class="panel-heading">My Settings</h2>

    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Quisquam at quidem unde, officiis dolor iure commodi vitae minima. Eos, quis?
    </p>

    <h3>General settings</h3>

    <div class="checkbox-container">
      <label>Dark mode</label>
      <input type="checkbox" name="dark-mode">
    </div>

    <div class="checkbox-container">
      <label>Larger text</label>
      <input type="checkbox" name="dark-mode">
    </div>

    <h3>Email address</h3>

    <p>This is the address we use to send you password reset requests and latest news.</p>

    <form action="settings.html" class="form">
      <label>Email</label>
      <input type="email" value="myemailaddress@email.com">

      <label>Enter your password to confirm</label>
      <input type="password_current">
    
      <input type="submit" name="submit" value="Update email address">
    </form>

    <h3>Password</h3>

    <form action="settings.html" class="form">
      <label>New password</label>
      <input type="password_one">

      <label>Retype new password</label>
      <input type="password_two">

      <label>Enter your password to confirm</label>
      <input type="password_current">
    
      <input type="submit" name="submit" value="Update password">
    </form>
  </div>
</template>

<script>
export default {
  name: 'settings'
}
</script>