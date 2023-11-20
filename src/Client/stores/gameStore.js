import { defineStore } from 'pinia'
// ToDo import DataService from './path/to/DataService';
import MockDataService from '../services/mockDataService.js'
import { usePlayerStore } from './playerStore'

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    games: [],
    activeGame: {},
    recentOpenedGameId: null
  }),

  actions: {

    useDataService () {
      return new MockDataService()
    },

    resetState () {
      this.games = []
      this.activeGame = {}
      this.recentOpenedGameId = null
    },

    async createGame (payload) {
      const dataService = this.useDataService()
      const playerStore = usePlayerStore()

      const gameData = await dataService.addGame(payload.gameName, payload.pawns, playerStore.player.name)
      // ToDo const gameData = await dataService.addGame(payload.gameName, payload.pawns, state.player);

      if (gameData !== null) {
        this.openGame(gameData.id)
      }
    },

    async openGame (payload) {
      const dataService = this.useDataService()
      const gameData = dataService.fetchGameWithPlayerPawns()

      if (gameData !== null) {
        this.activeGame = gameData
      }
    }
  }
})
