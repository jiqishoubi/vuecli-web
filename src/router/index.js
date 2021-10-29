import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  // UserLayout
  {
    path: '/user',
    component: () => import('@/layouts/UserLayout/index.vue'),
    children: [
      {
        path: '/user/login',
        component: () => import('@/views/login/index.vue'),
      }
    ]
  },
  // BasicLayout
  {
    path: '/',
    component: () => import('@/layouts/BasicLayout/index.vue'),
    children: [
      { path: '/', redirect: '/home' },
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;