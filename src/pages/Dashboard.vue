<template>
  <div class="page">
    <h1 class="text-2xl font-semibold">個人中心</h1>

    <!-- 使用者資訊 -->
    <div class="mt-6 card">
      <h2 class="mb-2 text-lg font-semibold">帳號資訊</h2>
      <div v-if="auth.user" class="text-slate-700">
        <p><span class="text-slate-500">名稱：</span>{{ auth.user.name }}</p>
        <p><span class="text-slate-500">Email：</span>{{ auth.user.email }}</p>
      </div>
      <div v-else class="text-slate-500">
        尚未登入。<RouterLink to="/login" class="underline">前往登入</RouterLink>
      </div>
    </div>

    <!-- 我的指南 -->
    <div class="mt-6">
      <div class="mb-3 flex items-center justify-between">
        <h2 class="text-lg font-semibold">我的指南</h2>
        <RouterLink to="/guides/new" class="btn-primary">新增指南</RouterLink>
      </div>

      <div v-if="myGuides.length" class="grid gap-4 sm:grid-cols-2">
        <RouterLink
          v-for="g in myGuides"
          :key="g.id"
          :to="`/guides/${g.id}/edit`"
          class="card hover:shadow-lg"
        >
          <p class="text-lg font-semibold">{{ g.title }}</p>
          <p class="mt-1 text-sm text-slate-500">
            更新時間：{{ new Date(g.updatedAt).toLocaleString() }}
          </p>
          <div class="mt-2 line-clamp-3 text-slate-600" v-html="g.content" />
        </RouterLink>
      </div>

      <div v-else class="card text-slate-500">
        你還沒有建立任何指南，先
        <RouterLink to="/guides/new" class="underline">新增一篇</RouterLink>
        吧！
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useGuideStore } from '@/stores/guides'

const auth = useAuthStore()
const guides = useGuideStore()

onMounted(() => {
  // 確保列表已載入
  if (!guides.items.length) guides.fetch()
})

const myGuides = computed(() => {
  if (!auth.user) return []
  return guides.items.filter(g => g.author?.id === auth.user.id)
})
</script>

<style scoped>
/* 可選：這裡留空或加上局部樣式 */
</style>
