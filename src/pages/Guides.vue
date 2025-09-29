<template>
  <div class="page">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h1 class="text-2xl font-bold tracking-tight">指南</h1>
      <div class="flex items-center gap-2">
        <RouterLink v-if="authed" to="/guides/new" class="btn-primary">新增指南</RouterLink>
        <RouterLink to="/explore" class="btn-outline">探索主題</RouterLink>
      </div>
    </div>

    <!-- 控制列 -->
    <div class="mt-4 grid gap-3 md:grid-cols-[1fr,200px,200px]">
      <input v-model="q" placeholder="搜尋標題/內文/標籤..." class="rounded-xl border p-3"/>

      <select v-model="role" class="rounded-xl border p-3">
        <option value="">全部角色</option>
        <option v-for="r in ROLES" :key="r.id" :value="r.id">{{ r.name }}</option>
      </select>

      <select v-model="sortBy" class="rounded-xl border p-3">
        <option value="updatedAt">最新更新</option>
        <option value="views">最多瀏覽</option>
        <option value="likes">最多喜歡</option>
      </select>
    </div>

    <!-- 標籤列 -->
    <div class="mt-3 flex flex-wrap gap-2">
      <button
        v-for="t in allTags"
        :key="t"
        @click="toggleTag(t)"
        :class="['px-3 py-1 rounded-full text-sm border transition',
                 activeTags.has(t) ? 'bg-primary text-white border-primary' : 'bg-white/70']">
        #{{ t }}
      </button>
      <button v-if="activeTags.size" class="btn-outline" @click="activeTags = new Set()">清除標籤</button>
    </div>

    <!-- 列表 -->
    <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="g in paged"
        :key="g.id"
        class="card hover:shadow-glow transition flex flex-col">
        <p class="text-sm text-slate-500">{{ formatDate(g.updatedAt) }}</p>
        <h3 class="mt-1 text-lg font-semibold line-clamp-1">{{ g.title }}</h3>
        <div class="mt-2 text-slate-600 line-clamp-3" v-html="g.content"></div>

        <div class="mt-3 flex flex-wrap gap-2">
          <span v-for="r in g.roleIds" :key="r" class="rounded-full border bg-white/70 px-2 py-0.5 text-xs">
            {{ roleName(r) }}
          </span>
          <span v-for="t in g.tags || []" :key="t" class="rounded-full bg-slate-100 px-2 py-0.5 text-xs">#{{ t }}</span>
        </div>

        <div class="mt-4 flex items-center justify-between">
          <div class="flex items-center gap-3 text-sm text-slate-500">
            <span>👁️ {{ g.views || 0 }}</span>
            <button class="underline" @click="like(g)">👍 {{ g.likes || 0 }}</button>
          </div>
          <div class="flex items-center gap-2">
            <RouterLink v-if="authed" :to="`/guides/${g.id}/edit`" class="btn-outline">編輯</RouterLink>
            <RouterLink :to="`/read/${g.id}`" class="btn-outline">閱讀</RouterLink>
            <button class="btn-outline" @click="toggleFav(g.id)">{{ isFav(g.id) ? '★ 已收藏' : '☆ 收藏' }}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 分頁 -->
    <div class="mt-6 flex items-center justify-center gap-2">
      <button class="btn-outline" :disabled="page<=1" @click="page--">上一頁</button>
      <span class="text-sm text-slate-500">第 {{ page }} / {{ totalPages }} 頁</span>
      <button class="btn-outline" :disabled="page>=totalPages" @click="page++">下一頁</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useGuideStore } from '@/stores/guides'
import { useAuthStore } from '@/stores/auth'
import { ROLES } from '@/lib/roles'
import * as api from '@/lib/api'

const store = useGuideStore()
const auth = useAuthStore()
const authed = computed(() => auth.isAuthed)

const q = ref('')
const role = ref('')
const sortBy = ref('updatedAt')
const page = ref(1)
const pageSize = 9
const activeTags = ref(new Set())

onMounted(() => store.fetch())

const allTags = computed(() => {
  const s = new Set()
  store.items.forEach(g => (g.tags || []).forEach(t => s.add(t)))
  return [...s].sort()
})

const roleName = rid => ROLES.find(r => r.id === rid)?.name || rid
const formatDate = ts => new Date(ts).toLocaleDateString()

// 喜歡 +1（寫回 localStorage，簡化示範）
async function like(g) {
  await api.updateGuide(g.id, { likes: (g.likes || 0) + 1 })
  await store.fetch()
}

// 收藏（localStorage：tg_favs）
const FKEY = 'tg_favs'
const favSet = ref(new Set(JSON.parse(localStorage.getItem(FKEY) || '[]')))
const isFav = id => favSet.value.has(id)
function toggleFav(id){
  if (favSet.value.has(id)) favSet.value.delete(id)
  else favSet.value.add(id)
  localStorage.setItem(FKEY, JSON.stringify([...favSet.value]))
}

function toggleTag(t){ activeTags.value.has(t) ? activeTags.value.delete(t) : activeTags.value.add(t) }

const filtered = computed(() => {
  const kw = q.value.trim().toLowerCase()
  const hasKw = g =>
    !kw || g.title.toLowerCase().includes(kw) ||
    (g.content || '').toLowerCase().includes(kw) ||
    (g.tags || []).some(t => t.toLowerCase().includes(kw))
  const hasRole = g => !role.value || (g.roleIds || []).includes(role.value)
  const hasTags = g => !activeTags.value.size || (g.tags || []).some(t => activeTags.value.has(t))
  return store.items.filter(g => hasKw(g) && hasRole(g) && hasTags(g))
})

const sorted = computed(() => {
  const arr = [...filtered.value]
  if (sortBy.value === 'updatedAt') arr.sort((a,b)=> (b.updatedAt||0)-(a.updatedAt||0))
  if (sortBy.value === 'views')     arr.sort((a,b)=> (b.views||0)-(a.views||0))
  if (sortBy.value === 'likes')     arr.sort((a,b)=> (b.likes||0)-(a.likes||0))
  return arr
})

const totalPages = computed(() => Math.max(1, Math.ceil(sorted.value.length / pageSize)))
const paged = computed(() => {
  page.value = Math.min(page.value, totalPages.value)
  const start = (page.value - 1) * pageSize
  return sorted.value.slice(start, start + pageSize)
})
</script>
