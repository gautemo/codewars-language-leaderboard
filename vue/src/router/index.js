import { createRouter, createHistory } from '@posva/vue-router-next'
import Home from '../views/Home.vue'
import Leaderboard from '../views/Leaderboard.vue'

const routerHistory = createHistory()
export const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/:leaderboard',
      name: 'Leaderboard',
      component: Leaderboard,
    }
  ]
});
