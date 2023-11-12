import { createApp } from 'vue'
import App from './Client/views/App.vue'
// TODO: uncomment:import './Assets/scss/custom.scss'
// ToDO fix this: import './Client/assets/graphics/favicon.ico'
// TODO: uncomment:import store from './Store/index'
import 'bootstrap/dist/css/bootstrap.css'
import { createPinia } from 'pinia'
import router from './router.js'

const app = createApp(App)
const pinia = createPinia()

// Use plugins with the Vue 3 app instance
app.use(pinia)
app.use(router)

// Mount the application to the DOM
app.mount('#app')
