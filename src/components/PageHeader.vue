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
        <router-link :to="{ name: 'Home' }" tag="li">
          <a>Home</a>
        </router-link>

        <router-link :to="{ name: 'Decks' }" tag="li">
          <a>My Decks</a>
        </router-link>

        <router-link :to="{ name: 'Settings' }" tag="li">
          <a>My Settings</a>
        </router-link>

        <router-link :to="{ name: 'About' }" tag="li">
          <a>About Flashcards</a>
        </router-link>

        <li>
          <a href="javascript:;">Logout</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {  
  name: 'pageHeader'
}
</script>