<template>
    <b-container fluid class="mt-0">
      <b-row class="g-0">
        <b-col cols="4">
          <GameSettings />
        </b-col>
        <b-col cols="8" class="portSetup">
          <b-row>
            <b-col>
              <div class="bg-transparent py-1">
                <h1 class="h1">Port setup</h1>
                <p class="lead">Plan your port and be ready for the <strong>naval battle</strong>!</p>
                <hr />
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <Port :board="board" />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useGameStore } from '../stores/gameStore.js'
import GameSettings from './components/GameSettingsComponent.vue'
import Port from './components/PortComponent.vue'
import PortBoard from './../GameEngine/portBoard.js'

export default {
  name: 'GameSetupView',
  components: {
    GameSettings,
    Port
  },
  setup () {
    const gameStore = useGameStore()
    const router = useRoute()
    const board = ref(new PortBoard())

    const createGame = async (payload) => {
      console.debug(`event-on: 'createGame' with payload ${JSON.stringify(payload)}`)
      await gameStore.createGame({
        gameName: payload.name,
        pawns: board.value.toPawnArray()
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
    .portSetup {
      border-left: 1px solid #00000010;
    }
</style>
