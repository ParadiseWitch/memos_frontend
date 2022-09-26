import { createRouter, createWebHashHistory } from "vue-router";

export default createRouter({
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


