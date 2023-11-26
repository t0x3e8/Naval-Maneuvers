import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settingsStore', {
  state: () => ({
    PawnsResourcePathInPublicFolder: '/assets/pawns'
  })
})
