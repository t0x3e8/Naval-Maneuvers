import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { createPinia } from 'pinia'
import router from './router.js'

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
  import('./Client/views/PortSetup.vue').then(module => {
    createAppOnModule(module.default)
  })
}

export function loadGame () {
  if (currentApp) {
    currentApp.unmount()
  }
  import('./Client/views/Game.vue').then(module => {
    createAppOnModule(module.default)
  })
}

window.loadPortSetup = loadPortSetup
window.loadGame = loadGame
