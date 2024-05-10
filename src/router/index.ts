import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/main' },
  {
    path: '/main',
    redirect: '/main/hello',
    component: () => import('@/layouts/defaultLayout.vue'),
    children: [
      {
        path: 'hello',
        name: 'hello',
        component: () => import('@/views/hello/Hello.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
