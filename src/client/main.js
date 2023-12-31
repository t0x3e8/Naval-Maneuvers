import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router.js'
import '@picocss/pico/css/pico.css'
import './customs.css'

const pinia = createPinia()

let currentApp = null

function createAppOnModule (module) {
  currentApp = createApp(module)
  currentApp.use(pinia)
  currentApp.use(router)
  currentApp.mount('#app')
}

export function loadPortSetup () {
  if (currentApp) {
    currentApp.unmount()
  }
  import('./views/PortSetup.vue').then(module => {
    createAppOnModule(module.default)
  })
}

export function loadGame () {
  if (currentApp) {
    currentApp.unmount()
  }
  import('./views/Game.vue').then(module => {
    createAppOnModule(module.default)
  })
}

window.loadPortSetup = loadPortSetup
window.loadGame = loadGame
