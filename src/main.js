import { createApp } from 'vue'
// import App from './Client/views/App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { createPinia } from 'pinia'
import router from './router.js'

const pinia = createPinia()

let currentApp = null

export function loadPortSetup () {
  if (currentApp) {
    currentApp.unmount()
  }
  import('./Client/views/PortSetup.vue').then(module => {
    const PortSetup = module.default
    currentApp = createApp(PortSetup)
    currentApp.use(pinia)
    currentApp.use(router)
    currentApp.mount('#app')
  })
}

export function loadGame () {
  if (currentApp) {
    currentApp.unmount()
  }
  import('./Client/views/Game.vue').then(module => {
    const Game = module.default
    currentApp = createApp(Game)
    currentApp.use(pinia)
    currentApp.use(router)
    currentApp.mount('#app')
  })
}

window.loadPortSetup = loadPortSetup
window.loadGame = loadGame
