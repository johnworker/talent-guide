<template>
  <header :class="['sticky top-0 z-50 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 transition-shadow',
                  scrolled ? 'shadow-lg/5' : '']">
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3" aria-label="Primary">
      <!-- Logo（點擊回首頁） -->
      <RouterLink to="/" class="flex items-center gap-2" aria-label="回首頁">
        <img src="@/assets/logo.svg" alt="TalentGuide" class="h-8 w-auto" />
        <span class="sr-only">TalentGuide</span>
      </RouterLink>

      <!-- 桌機導覽 -->
      <div class="hidden items-center gap-1 md:flex">
        <RouterLink :to="{ name: 'explore' }" class="nav-link" :class="{ 'is-active': isActive('/explore') }">探索</RouterLink>
        <RouterLink :to="{ name: 'collab' }" class="nav-link" :class="{ 'is-active': isActive('/collab') }">組合</RouterLink>
        <RouterLink :to="{ name: 'counterflow' }" class="nav-link" :class="{ 'is-active': isActive('/counterflow') }">逆流</RouterLink>
        <RouterLink :to="{ name: 'roles' }" class="nav-link" :class="{ 'is-active': isActive('/roles') }">角色</RouterLink>
        <RouterLink :to="{ name: 'guides' }" class="nav-link" :class="{ 'is-active': isActive('/guides') }">指南</RouterLink>
        <RouterLink :to="{ name: 'faq' }" class="nav-link" :class="{ 'is-active': isActive('/faq') }">FAQ</RouterLink>
        <RouterLink :to="{ name: 'recommend' }" class="btn-primary ml-1">開始測驗</RouterLink>

        <!-- 使用者區 -->
        <template v-if="auth.isAuthed">
          <div class="relative">
            <button class="nav-ghost" @click="userOpen = !userOpen" aria-haspopup="menu" aria-expanded="userOpen">
              <span class="inline-grid h-8 w-8 place-items-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
                {{ initials }}
              </span>
              <ChevronDownIcon class="h-4 w-4 opacity-60" />
            </button>
            <Transition name="fade">
              <ul v-if="userOpen" class="absolute right-0 mt-2 min-w-[180px] overflow-hidden rounded-xl border bg-white/95 p-1 shadow-soft">
                <li>
                  <RouterLink to="/dashboard" class="menu-item">我的儀表板</RouterLink>
                </li>
                <li>
                  <RouterLink to="/guides/new" class="menu-item">建立指南</RouterLink>
                </li>
                <li><hr class="my-1 border-slate-200/70" /></li>
                <li>
                  <button class="menu-item text-red-600" @click="logout">登出</button>
                </li>
              </ul>
            </Transition>
          </div>
        </template>
        <template v-else>
          <RouterLink :to="{ name:'login' }" class="nav-link">登入</RouterLink>
          <RouterLink :to="{ name:'register' }" class="nav-link">註冊</RouterLink>
        </template>
      </div>

      <!-- 漢堡按鈕（行動版） -->
      <button class="nav-ghost md:hidden" @click="open = !open" aria-label="開啟選單">
        <component :is="open ? XMarkIcon : Bars3Icon" class="h-6 w-6" />
      </button>
    </nav>

    <!-- 行動版抽屜 -->
    <Transition name="fade">
      <div v-if="open" class="md:hidden">
        <div class="mx-auto max-w-6xl px-4 pb-4">
          <div class="card bg-white/90">
            <div class="grid gap-1">
              <RouterLink @click="open=false" :to="{ name: 'explore' }" class="menu-item" :class="{ 'is-active': isActive('/explore') }">探索</RouterLink>
              <RouterLink @click="open=false" :to="{ name: 'roles' }" class="menu-item" :class="{ 'is-active': isActive('/roles') }">角色</RouterLink>
              <RouterLink @click="open=false" :to="{ name: 'guides' }" class="menu-item" :class="{ 'is-active': isActive('/guides') }">指南</RouterLink>
              <RouterLink @click="open=false" :to="{ name: 'faq' }" class="menu-item" :class="{ 'is-active': isActive('/faq') }">FAQ</RouterLink>
              <RouterLink @click="open=false" :to="{ name: 'recommend' }" class="btn-primary mt-1 justify-center">開始測驗</RouterLink>
              <template v-if="auth.isAuthed">
                <RouterLink @click="open=false" to="/dashboard" class="menu-item">我的儀表板</RouterLink>
                <RouterLink @click="open=false" to="/guides/new" class="menu-item">建立指南</RouterLink>
                <button class="menu-item text-red-600" @click="logout">登出</button>
              </template>
              <template v-else>
                <RouterLink @click="open=false" :to="{ name:'login' }" class="menu-item">登入</RouterLink>
                <RouterLink @click="open=false" :to="{ name:'register' }" class="menu-item">註冊</RouterLink>
              </template>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const open = ref(false)
const userOpen = ref(false)
const scrolled = ref(false)

const isActive = (prefix) => route.path === prefix || route.path.startsWith(prefix + '/')
const initials = computed(() => (auth.user?.name || 'U').slice(0, 2).toUpperCase())

const onScroll = () => { scrolled.value = window.scrollY > 4 }
onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }) })
onBeforeUnmount(() => { window.removeEventListener('scroll', onScroll) })

const logout = () => {
  auth.logout()
  userOpen.value = false
  open.value = false
  router.push('/')
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .18s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.menu-item { @apply flex items-center gap-2 rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100; }
.menu-item.is-active { @apply bg-sky-50 text-sky-700; }
</style>
