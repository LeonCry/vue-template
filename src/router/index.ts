import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/HelloWorld' },
  { path: '/HelloWorld', name: '你好', component: () => import('@/pages/HelloWorld.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
