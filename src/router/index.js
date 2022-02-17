import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import GatherTheSeeds from '../views/GatherTheSeeds.vue'
import FindThePairs from '../views/FindThePairs.vue'

// import FindTheDonkey from '../views/FindTheDonkey.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
  // {
  //   path: '/FindTheDonkey',
  //   name: 'FindTheDonkey',
  //   component: FindTheDonkey
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
