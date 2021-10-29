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
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('../views/About.vue'),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
