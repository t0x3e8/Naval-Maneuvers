<template>
    <div>
      <div class="d-flex w-100 justify-content-between">
        {{ game.name }}
        <small>{{ game.gameDuration }} min ago</small>
      </div>

      <div class="d-flex w-100 justify-content-between">
        <p class="mb-1">
          <span class="badge bg-info rounded-pill">{{ game.players.length }}/{{ maxPlayers }}</span>
        </p>
        <button v-if="game.hasJoined" class="btn btn-outline-primary btn-sm" @click="open(game.id)">open</button>
        <button v-if="!game.hasJoined && game.canJoin" class="btn btn-outline-primary btn-sm" @click="join(game.id)">
          join
        </button>
        <button v-if="!game.canJoin && !game.hasJoined" class="btn btn-outline-danger btn-sm" disabled>closed</button>
      </div>
    </div>
  </template>

<script>
import { defineComponent/*,  toRefs */ } from 'vue'
// import { JOIN_OPEN_GAME, OPEN_GAME } from './../eventsTypes.js'

export default defineComponent({
  name: 'GameListItemComponent',
  props: {
    game: {
      type: Object,
      default: () => ({})
    },
    maxPlayers: {
      type: Number,
      default: 2
    }
  },
  setup (props, { emit }) {
    // const { game } = toRefs(props)

    const join = (gameId) => {
    //   console.debug(`event-emit: ${JOIN_OPEN_GAME}`)
    //   emit(JOIN_OPEN_GAME, { gameId })
    }

    const open = (gameId) => {
    //   console.debug(`event-emit: ${OPEN_GAME}`)
    //   emit(OPEN_GAME, { gameId })
    }

    return { /* game, */ join, open }
  }
})
</script>

  <style scoped>
  /* Add any custom styles here */
  </style>
