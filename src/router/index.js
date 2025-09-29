// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

// 頁面匯入（大小寫請與檔名一致）
import Home from "@/pages/Home.vue";
import Roles from "@/pages/Roles.vue";
import RoleDetail from "@/pages/RoleDetail.vue";
import Recommend from "@/pages/Recommend.vue";
import Guides from "@/pages/Guides.vue";
import GuideEditor from "@/pages/GuideEditor.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import Explore from "@/pages/Explore.vue"; // ⬅️ 新增
import FAQ from "@/pages/FAQ.vue"; // ⬅️ 新增
import Read from "@/pages/Read.vue";
import Collab from "@/pages/Collab.vue";
import Counterflow from "@/pages/Counterflow.vue";
import NotFound from "@/pages/NotFound.vue";

import { useAuthStore } from "@/stores/auth";

const routes = [
  { path: "/", name: "home", component: Home, meta: { title: "首頁" } },
  {
    path: "/collab",
    name: "collab",
    component: Collab,
    meta: { title: "合作組合實驗室" },
  },
  {
    path: "/counterflow",
    name: "counterflow",
    component: Counterflow,
    meta: { title: "逆流應對指南" },
  },
  {
    path: "/explore",
    name: "explore",
    component: Explore,
    meta: { title: "探索主題" },
  }, // ⬅️ 新增
  { path: "/faq", name: "faq", component: FAQ, meta: { title: "常見問題" } }, // ⬅️ 新增
  { path: "/roles", name: "roles", component: Roles },
  { path: "/roles/:id", name: "role-detail", component: RoleDetail },
  { path: "/recommend", name: "recommend", component: Recommend },
  { path: "/guides", name: "guides", component: Guides },
  {
    path: "/read/:id",
    name: "read",
    component: Read,
    meta: { title: "閱讀指南" },
  },
  {
    path: "/guides/new",
    name: "guide-new",
    component: GuideEditor,
    meta: { requiresAuth: true },
  },
  {
    path: "/guides/:id/edit",
    name: "guide-edit",
    component: GuideEditor,
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { guestOnly: true },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: { guestOnly: true },
  },
  { path: "/:pathMatch(.*)*", name: "404", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 如果有子目錄部署，這裡加 base，如 createWebHistory('/talent-guide/')
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

router.beforeEach((to) => {
  const auth = useAuthStore();
  if (to.meta?.requiresAuth && !auth.isAuthed) {
    return { name: "login", query: { redirect: to.fullPath } };
  }
  if (to.meta?.guestOnly && auth.isAuthed) {
    return { name: "dashboard" };
  }
});

router.afterEach((to) => {
  if (to.meta?.title) document.title = `${to.meta.title} | TalentGuide`;
});

export default router;
