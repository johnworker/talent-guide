// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// 頁面
import Home from '@/pages/Home.vue'
import Roles from '@/pages/Roles.vue'
import RoleDetail from '@/pages/RoleDetail.vue'
import Recommend from '@/pages/Recommend.vue'
import Guides from '@/pages/Guides.vue'
import GuideEditor from '@/pages/GuideEditor.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import NotFound from '@/pages/NotFound.vue'
import Collab from '@/pages/Collab.vue'
import Counterflow from '@/pages/Counterflow.vue'


import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/', name: 'home', component: Home, meta: { title: '首頁' } },
  { path: '/roles', name: 'roles', component: Roles, meta: { title: '角色一覽' } },
  { path: '/roles/:id', name: 'role-detail', component: RoleDetail, meta: { title: '角色解說' } },
  { path: '/recommend', name: 'recommend', component: Recommend, meta: { title: '推薦測驗' } },
  { path: '/guides', name: 'guides', component: Guides, meta: { title: '指南' } },
  { path: '/guides/new', name: 'guide-new', component: GuideEditor, meta: { requiresAuth: true, title: '新增指南' } },
  { path: '/guides/:id/edit', name: 'guide-edit', component: GuideEditor, meta: { requiresAuth: true, title: '編輯指南' } },
  { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { requiresAuth: true, title: '我的' } },
  { path: '/login', name: 'login', component: Login, meta: { guestOnly: true, title: '登入' } },
  { path: '/register', name: 'register', component: Register, meta: { guestOnly: true, title: '註冊' } },
  { path: '/:pathMatch(.*)*', name: '404', component: NotFound, meta: { title: '404' } },
  { path: '/collab', name: 'collab', component: Collab, meta:{ title:'合作組合' } },
  { path: '/counterflow', name: 'counterflow', component: Counterflow, meta:{ title:'逆流應對' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior () { return { top: 0 } },
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta && to.meta.requiresAuth && !auth.isAuthed) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (to.meta && to.meta.guestOnly && auth.isAuthed) {
    return { name: 'dashboard' }
  }
})

router.afterEach((to) => {
  const t = (to.meta && to.meta.title) ? `${to.meta.title}｜TalentGuide` : 'TalentGuide'
  document.title = t
  document.title = (to.meta?.title ? `${to.meta.title}｜` : '') + 'TalentGuide'
})

export default router
