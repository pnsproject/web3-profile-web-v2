import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home/MainEntry.vue'
import NotFound from '@/views/NotFound/MainEntry.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/notfound',
    name: 'notfound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  console.log('beforeEach----')
  next()
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})

export default router
