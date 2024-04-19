import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: '登录', component: () => import('@/views/login/LoginView.vue') },
  {
    path: '/main',
    redirect: '/main/home',
    component: () => import('@/layouts/defaultLayout.vue'),
    children: [
      { path: 'home', name: '首页', component: () => import('@/views/home/HomeView.vue') },
      {
        path: 'workbench',
        name: '工作台',
        component: () => import('@/views/workBench/WorkBenchView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
