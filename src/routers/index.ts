import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const HelloWorld = () => import("@/components/HelloWorld.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
   meta: {
     title: "首页",
    },
     component: HelloWorld,
  },
  {
  path: "/login",
  name: "login",
  meta: {
   title: "登录",
   },
   component: () => import("@/views/login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
