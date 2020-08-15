<template>
  <header class="page-header">
    <nav class="page-block">
      <a 
        href="javascript:;"
        class="mobile-navigation-btn show-lt-md"
        id="mobile-navigation-btn"
        onclick="toggleNavigation();"
      >
        <i class="fas fa-bars"></i>
      </a>

      <ul class="page-navigation show-gt-md" id="page-navigation">
        <li><a href="decks.html">Decks</a></li>
        <li><a href="settings.html">My Settings</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="index.html">Logout</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {  
  name: 'pageHeader'
}
</script>