<template>
    <form @submit.stop.prevent="onNewGame" class="needs-validation" novalidate>
      <div class="mb-3">
        <label for="gameSearchInput" class="form-label">List of games</label>
        <div class="input-group pl-3">
          <input
            id="gameSearchInput"
            v-model.trim="gameSearchText"
            type="text"
            class="form-control"
            placeholder="Search game ..."
          />
        </div>
        <GamesListRefresh />
        <div class="list-group">
          <div
            v-for="(game, gameIndex) in gamesFiltered"
            :key="`${gameIndex}`"
            class="list-group-item flex-column align-items-start"
          >
            <game-list-item :game="game" :max-players="maxPlayers" />
          </div>
        </div>
      </div>
    </form>
  </template>

<script>
import { defineComponent, ref, /* computed, */ onMounted, onBeforeUnmount } from 'vue'
// import { useStore } from 'vuex'
import GameListItem from './GameListItemComponent.vue'
import GamesListRefresh from './GamesListRefreshComponent.vue'
// import _ from 'underscore'
// import { REFRESH_GAMES_LIST } from './../eventsTypes.js'

export default defineComponent({
  name: 'GamesListComponent',
  components: {
    GameListItem,
    GamesListRefresh
  },
  setup () {
    // const store = useStore()
    const gameSearchText = ref('')
    const maxPlayers = ref(2)

    // const gamesFiltered = computed(() => {
    //   const gamesIncludingState = _.map(store.state.games, (g) => {
    //     g.canJoin = g.players.length < maxPlayers.value
    //     g.hasJoined = _.some(g.players, (p) => p.id === store.state.player.id)

    //     return g
    //   })

    //   return _.filter(
    //     gamesIncludingState,
    //     (g) => g.name.toLowerCase().includes(gameSearchText.value.toLowerCase())
    //   )
    // })

    const refreshList = () => {
    //   store.dispatch('getGames')
    }

    onMounted(() => {
    //   store.$root.$on(REFRESH_GAMES_LIST, refreshList)
    })

    onBeforeUnmount(() => {
    //   store.$root.$off(REFRESH_GAMES_LIST, refreshList)
    })

    return { gameSearchText, maxPlayers, /* gamesFiltered, */ refreshList }
  }
})
</script>

  <style scoped>
  /* Add any custom styles here */
  </style>
