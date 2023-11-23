import { createApp } from 'vue'
import App from './Client/views/App.vue'
// TODO: uncomment:import './Assets/scss/custom.scss'
// TODO: uncomment:import store from './Store/index'
import 'bootstrap/dist/css/bootstrap.css'
import { createPinia } from 'pinia'
import router from './router.js'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.provide('settings', {
  PawnsResourcePathInPublicFolder: '/assets/pawns/'
})

// Mount the application to the DOM
app.mount('#app')
