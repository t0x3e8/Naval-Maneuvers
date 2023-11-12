import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('playerStore', {
  // The `state` method returns the state object
  state: () => ({
    player: {},
    games: [],
    activeGame: {},
    recentOpenedGameId: null
  }),

  actions: {
    resetState () {
      // Here we reset the state to its initial values
      this.player = {}
      this.games = []
      this.activeGame = {}
      this.recentOpenedGameId = null
    }

    // Define other actions here
  },

  // Getters can be used to define computed properties for the store
  getters: {
    // Example getter
    // TODO: to be removed
    isPlayerActive: (state) => {
      return Object.keys(state.player).length > 0
    }

    // Define other getters here
  }
})
