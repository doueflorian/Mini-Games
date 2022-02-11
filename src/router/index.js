import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import FindTheDonkey from '../views/FindTheDonkey.vue'
import GatherTheSeeds from '../views/GatherTheSeeds.vue'
import FindThePairs from '../views/FindThePairs.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/FindTheDonkey',
    name: 'FindTheDonkey',
    component: FindTheDonkey
  },
  {
    path: '/GatherTheSeeds',
    name: 'GatherTheSeeds',
    component: GatherTheSeeds
  },
  {
    path: '/FindThePairs',
    name: 'FindThePairs',
    component: FindThePairs
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
