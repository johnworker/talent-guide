<template>
  <div class="page grid gap-6 lg:grid-cols-3">
    <!-- 左：拖拉選角 -->
    <div class="lg:col-span-1">
      <h1 class="text-2xl font-bold">合作組合實驗室</h1>
      <p class="mt-1 text-slate-600">把角色卡拖進右邊框，選 2–3 個，依序代表偏好權重。</p>

      <div class="mt-4 grid grid-cols-2 gap-2">
        <button v-for="r in ROLES" :key="r.id" class="rounded-xl border bg-white/70 px-3 py-2 hover:shadow"
                draggable="true" @dragstart="onDragStart(r)">
          {{ r.name }}
        </button>
      </div>

      <div class="mt-6">
        <SynergyGrid :picked="pickedIds" />
      </div>
    </div>

    <!-- 右：投放區＋結果 -->
    <div class="lg:col-span-2">
      <div class="card">
        <h2 class="mb-2 font-semibold">投放區（2–3 個，拖拉可重排）</h2>
        <div class="flex min-h-[72px] flex-wrap gap-2 rounded-xl border p-3"
             @dragover.prevent @drop="onDrop">
          <span v-for="(id,idx) in pickedIds" :key="id"
                class="cursor-move rounded-full border bg-white/80 px-3 py-1"
                draggable="true" @dragstart="onDragStart({id})" @dragend="dragging=null">
            {{ id2name(id) }}
            <button class="ml-1 text-xs text-rose-500" @click="remove(id)">×</button>
          </span>
          <span v-if="!pickedIds.length" class="text-slate-400">把角色拖進來…</span>
        </div>
        <p class="mt-2 text-sm text-slate-500">提示：拖拉膠囊可重排，影響小隊建議。</p>
      </div>

      <div v-if="pickedIds.length" class="mt-6 grid gap-6 md:grid-cols-2">
        <div class="card">
          <h3 class="mb-2 font-semibold">最佳配對（Top 6）</h3>
          <div class="space-y-3">
            <div v-for="c in combos" :key="c.title" class="rounded-xl border p-3 hover:shadow">
              <p class="text-xs text-slate-500">{{ c.pairDetail.map(x=>x.name).join(' × ') }}</p>
              <p class="mt-1 font-semibold">{{ c.title }}</p>
              <p class="text-slate-600">{{ c.why }}</p>
              <p class="mt-1 text-xs text-rose-500/80">盲點：{{ c.pitfall }}</p>
              <ul class="mt-2 list-disc pl-5 text-sm">
                <li v-for="s in c.split" :key="s">{{ s }}</li>
              </ul>
              <div class="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                <span v-for="k in c.kpis" :key="k" class="rounded bg-slate-100 px-2 py-0.5">#{{ k }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <h3 class="mb-2 font-semibold">三人小隊建議</h3>
          <div v-if="trio">
            <p class="mb-2 text-slate-600">{{ trio.title }}</p>
            <ul class="space-y-2">
              <li v-for="m in trio.team" :key="m.roleId" class="rounded-xl border p-3">
                <b>{{ id2name(m.roleId) }}</b>（{{ m.slot }}）— {{ m.why }}
              </li>
            </ul>
          </div>
          <p v-else class="text-slate-500">請至少選 2 個角色</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ROLES } from '@/lib/roles'
import SynergyGrid from '@/components/roles/SynergyGrid.vue'
import { topCombos, suggestTrio } from '@/lib/combination.js'

const dragging = ref(null)
const pickedIds = ref([])

const onDragStart = (r) => { dragging.value = r.id || r }
const onDrop = () => {
  if(!dragging.value) return
  if(!pickedIds.value.includes(dragging.value) && pickedIds.value.length<3) pickedIds.value.push(dragging.value)
  dragging.value = null
}
const remove = (id)=> pickedIds.value = pickedIds.value.filter(x=>x!==id)
const id2name = (id)=> ROLES.find(r=>r.id===id)?.name || id

const pickedTop3 = computed(()=> pickedIds.value.map((id,idx)=>({ roleId:id, score: 3-idx })))
const combos = computed(()=> topCombos(pickedTop3.value).slice(0,6))
const trio = computed(()=> suggestTrio(pickedTop3.value))
</script>
