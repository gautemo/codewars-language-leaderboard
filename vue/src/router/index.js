import { createRouter, createHistory } from '@posva/vue-router-next'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

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
      component: About,
    }
  ]
});
