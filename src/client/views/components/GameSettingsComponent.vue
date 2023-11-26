<template>
    <div class="container">
      <div class="row">
        <div class="col">
          <new-game />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <games-list />
        </div>
      </div>
    </div>
  </template>

<script>
import { defineComponent } from 'vue'
import NewGame from './NewGameComponent.vue'
import GamesList from './GamesListComponent.vue'

export default defineComponent({
  name: 'GameSettingsComponent',
  components: {
    NewGame,
    GamesList
  }
})
</script>

<style scoped></style>
