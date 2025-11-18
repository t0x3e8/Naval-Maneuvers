import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('playerStore', {
  state: () => ({
    name: {},
    defaultPortSettings: []
  }),

  actions: {
    savePortSettings () {
      localStorage.setItem('defaultPortSettings', JSON.stringify(this.defaultPortSettings))
    },
    loadPortSettings () {
      const settings = localStorage.getItem('defaultPortSettings')
      if (settings) {
        this.defaultPortSettings = JSON.parse(settings)
      }
    }
  },

  // Getters can be used to define computed properties for the store
  getters: {
    // Example getter
    // TODO: to be removed
    isPlayerActive: (state) => {
      return Object.keys(state.name).length > 0
    }

    // Define other getters here
  }
})
