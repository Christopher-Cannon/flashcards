<template>
  <div class="panel">
    <h2 class="panel-heading">My Settings</h2>

    <h3>General settings</h3>

    <div class="checkbox-container">
      <label>Dark mode</label>
      <input
        type="checkbox"
        name="dark-mode"
        :checked="this.$cookies.isKey('darkMode')"
        @change="toggleDarkMode()"
      >
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
  name: 'settings',
  methods: {
    toggleDarkMode() {
      this.$cookies.isKey('darkMode')
      ? this.$cookies.remove('darkMode')
      : this.$cookies.set('darkMode', 'on', 60*60*24*30*52)
      
      this.$emit('dark-mode-toggled')
    }
  }
}
</script>