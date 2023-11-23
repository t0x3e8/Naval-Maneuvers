<template>
    <div class="container mt-4">
      <div class="jumbotron">
        <h1 class="display-4">Become Admiral</h1>
        <p class="lead">and defeat your opponent in the ocean of possibilities.</p>
        <hr class="my-4">
        <p>Press here to start a game!</p>
        <router-link to="/" custom>
          <button type="button" class="btn btn-primary">Start game</button>
        </router-link>
      </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AboutView',
  setup () {
    const msg = ref('Hello world!')
    return {
      msg
    }
  }
}
</script>
