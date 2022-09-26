import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      alias: "/home",
      component: () => import('/@/pages/home')
    },
    {
      name: "login",
      path: '/login',
      component: () => import('/@/pages/login')
    },
  ]
})

export default router