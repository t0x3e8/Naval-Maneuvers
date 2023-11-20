<template>
  <div>
    <nav v-if="!hideNavigation" class="navbar navbar-expand-lg navbar-light py-0 my-0">
      <div class="container-fluid">
        <!-- Content for the navbar can go here -->

        <!-- This is a navbar toggler button for mobile responsive view -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navbar links -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="#" @click="signout">Sign {{ player.name }} out</router-link>
              <router-link class="nav-link" to="/about">About</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container-fluid">
      <router-view />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { usePlayerStore } from '../stores/playerStore'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'AppView',
  setup () {
    const store = usePlayerStore()
    const router = useRouter()
    const route = useRoute()

    const player = computed(() => store.player)
    const hideNavigation = computed(() => route.meta.hideNavigation)

    function signout () {
      store.signOutPlayer()
      router.push({ name: 'signup' })
    }

    return {
      player,
      hideNavigation,
      signout
    }
  }
}
</script>

<style>
/* TODO: install the font:
  @font-face {
    font-family: "Titillium Web";
    font-style: normal;
    font-weight: 400;
    src: url(../Assets/Fonts/titillium-web-v7-latin-regular.woff2)
      format("woff2");
  }
  html {
    font-size: 62.5%;
  }
  */
</style>
