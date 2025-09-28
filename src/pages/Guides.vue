<template>
  <div class="page">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h1 class="text-2xl font-semibold">指南</h1>
      <RouterLink to="/guides/new" class="btn-primary" v-if="authed">新增指南</RouterLink>
    </div>

    <!-- 篩選列 -->
    <div class="mt-4 grid gap-3 md:grid-cols-4">
      <input v-model="q" placeholder="搜尋標題或內文..." class="rounded-xl border p-3 md:col-span-2" />
      <select v-model="role" class="rounded-xl border p-3">
        <option value="">所有角色</option>
        <option v-for="r in ROLES" :key="r.id" :value="r.id">{{ r.name }}</option>
      </select>
      <select v-model="tag" class="rounded-xl border p-3">
        <option value="">所有標籤</option>
        <option v-for="t in tags" :key="t" :value="t">{{ t }}</option>
      </select>
      <select v-model="sort" class="rounded-xl border p-3">
        <option value="latest">最新更新</option>
        <option value="views">最多瀏覽</option>
        <option value="likes">最多喜歡</option>
      </select>
    </div>

    <!-- 列表 -->
    <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div v-if="store.loading" class="sm:col-span-2 lg:col-span-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="i in 6" :key="i" class="rounded-2xl border bg-white/60 p-5 animate-pulse h-40"></div>
      </div>

      <RouterLink v-for="g in pageItems" :key="g.id" :to="`/read/${g.id}`"
                  class="card hover:shadow-glow relative">
        <p class="text-lg font-semibold line-clamp-2">{{ g.title }}</p>
        <div class="mt-2 line-clamp-3 text-slate-600" v-html="g.content"></div>

        <div class="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <div class="flex flex-wrap gap-1">
            <span v-for="rid in g.roleIds" :key="rid" class="rounded bg-slate-100 px-2 py-0.5">#{{ id2name(rid) }}</span>
            <span v-for="t in g.tags||[]" :key="t" class="rounded bg-emerald-50 px-2 py-0.5 text-emerald-700">#{{ t }}</span>
          </div>
          <div class="flex items-center gap-3">
            <button class="hover:opacity-80" @click.prevent="like(g)">👍 {{ g.likes||0 }}</button>
            <span>👁️ {{ g.views||0 }}</span>
            <button @click.prevent="toggleFav(g.id)" :class="isFav(g.id)?'text-rose-500':'text-slate-400'">★</button>
          </div>
        </div>
      </RouterLink>
    </div>

    <!-- 空狀態 -->
    <div v-if="!store.loading && !filtered.length" class="mt-8 text-center text-slate-500">
      找不到符合的內容，試試其它關鍵字或條件。
    </div>

    <!-- 分頁 -->
    <div v-if="totalPages>1" class="mt-6 flex justify-center gap-2">
      <button class="btn-outline" :disabled="page===1" @click="page--">上一頁</button>
      <span class="rounded-xl border bg-white/70 px-4 py-2">第 {{ page }} / {{ totalPages }} 頁</span>
      <button class="btn-outline" :disabled="page===totalPages" @click="page++">下一頁</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useGuideStore } from '@/stores/guides'
import { useAuthStore } from '@/stores/auth'
import { ROLES } from '@/lib/roles'
import * as api from '@/lib/api'
import useFavorites from '@/composables/useFavorites'

const store = useGuideStore(); const auth = useAuthStore()
const authed = computed(()=>auth.isAuthed)

// filters
const q = ref(''); const role = ref(''); const tag = ref(''); const sort = ref('latest')
const page = ref(1); const pageSize = 6

// tags
const tags = ref([])
onMounted(async () => {
  await store.fetch()
  tags.value = await api.listTags()
})

// 收藏
const { isFav, toggle } = useFavorites()
const toggleFav = (id)=> toggle(id)

// 名稱輔助
const id2name = (id)=> ROLES.find(r=>r.id===id)?.name || id

// like / view
const like = async (g)=> {
  await api.likeGuide(g.id)
  // 同步本地 store
  const item = store.items.find(x=>x.id===g.id)
  if (item) item.likes = (item.likes||0)+1
}
watch(() => store.items, (list)=> list.forEach(g=> api.viewGuide(g.id)), { immediate:true })

// 過濾/排序/分頁
const filtered = computed(() => {
  const k = q.value.trim().toLowerCase()
  let arr = store.items.filter(g => {
    const hitText = !k || g.title.toLowerCase().includes(k) || (g.content||'').toLowerCase().includes(k)
    const hitRole = !role.value || (g.roleIds||[]).includes(role.value)
    const hitTag  = !tag.value || (g.tags||[]).includes(tag.value)
    return hitText && hitRole && hitTag
  })
  if (sort.value==='views') arr.sort((a,b)=>(b.views||0)-(a.views||0))
  else if (sort.value==='likes') arr.sort((a,b)=>(b.likes||0)-(a.likes||0))
  else arr.sort((a,b)=> (b.updatedAt||0)-(a.updatedAt||0))
  return arr
})
const totalPages = computed(()=> Math.max(1, Math.ceil(filtered.value.length / pageSize)))
watch([q, role, tag, sort], ()=> page.value = 1)
const pageItems = computed(()=> filtered.value.slice((page.value-1)*pageSize, page.value*pageSize))
</script>
