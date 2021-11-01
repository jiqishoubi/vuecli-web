import { createRouter, createWebHistory } from 'vue-router';

const homePath = '/web/company/home'

const route404 = {
  path: "/:catchAll(.*)",
  component: () => import('@/views/common/404/index.vue'),
}

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
      { path: '/', redirect: homePath },
      {
        path: homePath,
        component: () => import('@/views/home/index.vue'),
      },
      // 项目管理
      {
        path: '/web/company/projectmgr/projectmgr',
        component: () => import('@/views/project/projectMng/index.vue'),
      },
      route404
    ]
  },
  route404
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
