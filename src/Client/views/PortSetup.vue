<template>
    <b-container fluid class="mt-0">
      <b-row class="g-0">
        <b-col cols="8" class="portSetup">
            <Port :board="board" />
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useGameStore } from '../stores/gameStore.js'
import Port from './components/PortComponent.vue'
import PortBoard from './../GameEngine/portBoard.js'

export default {
  name: 'PortSetupView',
  components: {
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
