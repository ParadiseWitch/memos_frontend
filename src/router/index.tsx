import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
  {
    path: '/',
    component: () => import('/@/pages/home')             
  },
  {
      path: '/home',
      component: () => import('/@/pages/home')             
  },
  {
      path: '/login',
      // name: "test1",
      component: () => import('../pages/login')   
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router