<template>
  <router-view />
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
