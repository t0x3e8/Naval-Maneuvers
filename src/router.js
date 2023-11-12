import { createRouter, createWebHistory } from 'vue-router'
import About from './Client/views/About.vue'
// import Game from './Views/Game.vue'
// import SignUp from './Views/SignUp.vue'
// import GameSetup from './Views/GameSetup.vue'
// import { useStore } from './Store/index.js' // Assuming you're using Pinia or Vuex 4

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/about',
      component: About
    }
    // {
    //   path: '/game',
    //   component: Game,
    //   name: 'game',
    //   meta: { requiresAuth: true }
    // },
    // {
    //   path: '/signup',
    //   component: SignUp,
    //   name: 'signup',
    //   meta: { hideNavigation: true }
    // },
    // {
    //   path: '/',
    //   component: GameSetup,
    //   name: 'setup',
    //   meta: { requiresAuth: true }
    // }
  ]
})

router.beforeEach((to, from, next) => {
  // Assuming useStore is a Pinia or Vuex 4 store and it's set up to work with Vue 3
  // Todo: uncomment and change: const store = useStore()

  const isAuthorized = true// Todo: uncomment and change: store.isPlayerAuthorized

  if (to.meta.requiresAuth && !isAuthorized) {
    next({ name: 'signup' })
  } else {
    next()
  }
})

export default router
