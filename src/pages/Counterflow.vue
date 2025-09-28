<template>
  <div class="page grid gap-6 md:grid-cols-3">
    <div class="md:col-span-1 card">
      <h1 class="text-xl font-bold">逆流應對指南</h1>
      <label class="mt-3 block text-sm">依角色</label>
      <select v-model="picked" class="mt-1 w-full rounded-xl border p-3">
        <option disabled value="">請選擇角色</option>
        <option v-for="r in ROLES" :key="r.id" :value="r.id">{{ r.name }}</option>
      </select>

      <label class="mt-4 block text-sm">以關鍵字找症狀</label>
      <form @submit.prevent="search">
        <input v-model="kw" placeholder="如：拖稿 / 退單 / 加班" class="mt-1 w-full rounded-xl border p-3" />
        <button class="btn-outline mt-2 w-full">搜尋</button>
      </form>

      <div class="mt-6">
        <h2 class="mb-2 font-semibold">我的收藏</h2>
        <ul class="space-y-2">
          <li v-for="f in favorites" :key="f.key" class="rounded-xl border p-2 text-sm">
            <b>{{ f.roleName }}</b>｜{{ f.scene.title }}
            <button class="ml-2 text-xs text-rose-500" @click="removeFav(f)">移除</button>
          </li>
        </ul>
        <p v-if="!favorites.length" class="text-slate-500 text-sm">尚無收藏</p>
      </div>
    </div>

    <div class="md:col-span-2 space-y-4">
      <div v-if="picked" class="card">
        <h3 class="mb-2 font-semibold">角色：{{ id2name(picked) }}</h3>
        <div class="grid gap-3 md:grid-cols-2">
          <div v-for="s in current.scenes" :key="s.title" class="rounded-xl border p-4 hover:shadow">
            <p class="font-medium">{{ s.title }}</p>
            <p class="mt-1 text-sm text-slate-500">症狀：{{ s.signals.join('、') }}</p>
            <ul class="mt-2 list-disc pl-5 text-sm">
              <li v-for="a in s.antidotes" :key="a">{{ a }}</li>
            </ul>
            <div class="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
              <span v-for="m in (s.metrics||[])" :key="m" class="rounded bg-slate-100 px-2 py-0.5">#{{ m }}</span>
            </div>
            <div class="mt-3 flex gap-2">
              <button class="btn-outline" @click="copyScene(s)">複製</button>
              <button class="btn-outline" @click="toggleFav(picked, s)">收藏</button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="kw && signals.length" class="card">
        <h3 class="mb-2 font-semibold">與「{{ kw }}」相關的情境</h3>
        <div class="space-y-3">
          <div v-for="s in signals" :key="s.role + s.scene.title" class="rounded-xl border p-3 hover:shadow">
            <p class="text-sm text-slate-500">{{ id2name(s.role) }}｜{{ s.scene.title }}</p>
            <ul class="mt-1 text-sm list-disc pl-5">
              <li v-for="a in s.scene.antidotes" :key="a">{{ a }}</li>
            </ul>
            <div class="mt-2 flex gap-2">
              <button class="btn-outline" @click="copyScene(s.scene)">複製</button>
              <button class="btn-outline" @click="toggleFav(s.role, s.scene)">收藏</button>
            </div>
          </div>
        </div>
      </div>

      <p v-if="kw && !signals.length" class="text-slate-500">找不到相關結果。</p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { ROLES } from '@/lib/roles'
import { getAntidotes, findBySignal } from '@/lib/antidote.js'
import { useLocalStore } from '@/composables/useLocalStore'
const picked = ref('')
const kw = ref('')
const signals = ref([])
const id2name = (id)=> ROLES.find(r=>r.id===id)?.name || id
const current = computed(()=> picked.value ? getAntidotes(picked.value) : { scenes:[] })

const { get, toggleSet } = useLocalStore()
const FAVORITE_KEY = 'cf_fav'
const favorites = ref(get(FAVORITE_KEY, []))
const toggleFav = (roleId, scene) => favorites.value = toggleSet(FAVORITE_KEY, {
  key: `${roleId}:${scene.title}`, roleId, roleName: id2name(roleId), scene
}, 'key')
const removeFav = (f)=> favorites.value = toggleSet(FAVORITE_KEY, f, 'key')

const search = ()=> { signals.value = kw.value ? findBySignal(kw.value.trim()) : [] }
const copyScene = (s)=> {
  const txt = `${s.title}\n症狀：${s.signals?.join('、')||''}\n對策：\n- ${(s.antidotes||[]).join('\n- ')}`
  navigator.clipboard.writeText(txt)
}
</script>
