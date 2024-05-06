import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/main' },
  {
    path: '/main',
    redirect: '/main/workbench',
    component: () => import('@/layouts/defaultLayout.vue'),
    children: [
      {
        path: 'workbench',
        name: '工作台',
        component: () => import('@/views/workBench/WorkBenchView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
