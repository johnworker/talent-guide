<template>
  <div class="page">
    <h1 class="text-2xl font-bold">探索主題</h1>
    <p class="mt-1 text-slate-600">依角色與場景快速找到可用的指南與模板。</p>

    <!-- 熱門主題 -->
    <div class="mt-6 grid gap-4 md:grid-cols-3">
      <a href="#" class="card hover:shadow-glow" @click.prevent="go({ role:'creator', tag:'內容產出' })">
        <h3 class="text-lg font-semibold">創作者｜內容產出流水線</h3>
        <p class="text-slate-600">題庫 → 腳本 → 設計 → 發布 → 再利用</p>
      </a>
      <a href="#" class="card hover:shadow-glow" @click.prevent="go({ role:'merchant', tag:'漏斗' })">
        <h3 class="text-lg font-semibold">商人｜漏斗與轉化</h3>
        <p class="text-slate-600">價值主張、CTA、信任錨點與追蹤</p>
      </a>
      <a href="#" class="card hover:shadow-glow" @click.prevent="go({ role:'technician', tag:'效能' })">
        <h3 class="text-lg font-semibold">技師｜效能與穩定</h3>
        <p class="text-slate-600">APM、快取、索引、CDN 與併發</p>
      </a>
    </div>

    <!-- 熱門指南（依 views/likes） -->
    <h2 class="mt-10 mb-3 text-xl font-semibold">本週熱門</h2>
    <div class="grid gap-4 md:grid-cols-3">
      <RouterLink v-for="g in hot" :key="g.id" :to="`/read/${g.id}`" class="card hover:shadow-glow">
        <p class="text-lg font-semibold line-clamp-2">{{ g.title }}</p>
        <p class="mt-2 text-slate-600 line-clamp-3" v-html="g.content"></p>
        <p class="mt-2 text-xs text-slate-500">👁️ {{ g.views||0 }}　👍 {{ g.likes||0 }}</p>
      </RouterLink>
    </div>

    <!-- 快速進入（角色） -->
    <h2 class="mt-10 mb-3 text-xl font-semibold">依角色探索</h2>
    <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <button v-for="r in ROLES" :key="r.id" class="rounded-xl border bg-white/70 px-4 py-3 hover:shadow"
              @click="go({ role:r.id })">{{ r.name }}</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useGuideStore } from '@/stores/guides'
import { useRouter } from 'vue-router'
import { ROLES } from '@/lib/roles'

const store = useGuideStore()
const router = useRouter()

onMounted(()=> store.fetch())

const hot = computed(()=> {
  const arr = [...store.items]
  arr.sort((a,b)=> (b.views||0)+(b.likes||0)*3 - ((a.views||0)+(a.likes||0)*3))
  return arr.slice(0,6)
})

const go = (q) => {
  router.push({ name: 'guides', query: q })
}
</script>
