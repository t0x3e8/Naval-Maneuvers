<template>
    <div class="container">
      <div class="row">
        <div class="col-sidebar">
          <GameSettings />
        </div>
        <div class="col-main portSetup">
          <div class="row">
            <div class="col">
              <div class="bg-transparent py-1">
                <h1 class="h1">Port setup</h1>
                <p class="lead">Plan your port and be ready for the <strong>naval battle</strong>!</p>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '../stores/gameStore.js'
import GameSettings from './components/GameSettingsComponent.vue'
import Board from './../GameEngine/board.js'

export default {
  name: 'GameSetupView',
  components: {
    GameSettings
  },
  setup () {
    const gameStore = useGameStore()
    const router = useRouter()
    const board = ref(new Board())

    const createGame = async (payload) => {
      console.debug(`event-on: 'createGame' with payload ${JSON.stringify(payload)}`)
      await gameStore.createGame({
        gameName: payload.name,
        pawns: board.value.preservePawns()
      })
      router.push({ name: 'game' })
    }

    // const joinGame = async (payload) => {
    //   console.log(`event-on: 'joinGame' with payload ${JSON.stringify(payload)}`)
    //   await gameStore.openGame({
    //     gameId: payload.gameId,
    //     pawns: board.value.toRotatedPawnsArray()
    //   })
    //   router.push({ name: 'game' })
    // }

    const openGame = async (payload) => {
      console.log(`event-on: 'openGame' with payload ${JSON.stringify(payload)}`)
      await gameStore.openGame({
        gameId: payload.gameId
      })
      router.push({ name: 'game' })
    }

    onMounted(() => {
      // Add your event listeners here, consider using a different method than $root.$on
    })

    onBeforeUnmount(() => {
      // Clean up your event listeners here
    })

    return {
      board,
      createGame,
      // joinGame,
      openGame
    }
  }
}
</script>

  <style scoped>
    .container {
      width: 100%;
      padding: 0;
    }
    .row {
      display: flex;
      margin: 0;
    }
    .col-sidebar {
      flex: 0 0 33.333%;
      max-width: 33.333%;
    }
    .col-main {
      flex: 0 0 66.667%;
      max-width: 66.667%;
    }
    .col {
      flex: 1;
    }
    .portSetup {
      border-left: 1px solid #00000010;
    }
    .bg-transparent {
      background-color: transparent;
    }
    .py-1 {
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
    }
</style>
