<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ROLES } from '@/lib/roles'
import Tabs from '@/components/ui/Tabs.vue'
import metaJson from '@/data/roles.meta.json'
import { useGuideStore } from '@/stores/guides'
import combos from '@/data/role-combos.json'
import { getAntidotes } from '@/lib/antidote'
import SynergyGrid from '@/components/roles/SynergyGrid.vue'
import AntidoteList from '@/components/roles/AntidoteList.vue'

const route = useRoute()
const store = useGuideStore()
const role = ROLES.find(r => r.id === route.params.id) || ROLES[0]
const meta = metaJson.find(m => m.id === role.id) || {}
const tab = ref(0)
const related = computed(()=> store.items.filter(g => g.roleIds?.includes(role.id)))
onMounted(()=> document.title = `${role.name}｜TalentGuide`)
const pairItems = computed(()=>{
  const hits = combos.filter(c => c.pair.includes(role.id))
  return hits.map(h => ({ ...h, pairDetail: h.pair.map(id => ROLES.find(r=>r.id===id)) }))
})
const antidotes = getAntidotes(role.id)
</script>

<template>
  <div class="page">
    <RouterLink to="/roles" class="text-sm text-slate-500">← 返回角色一覽</RouterLink>
    <h1 class="mt-2 text-3xl font-bold">{{ role.name }}</h1>
    <p class="mt-1 text-slate-600">{{ role.intro }}</p>

    <div class="mt-6">
      <Tabs :tabs="['適合任務','衡量指標','技能清單','常用工具','成長路徑']" v-model="tab">
        <template #default="{ index }">
          <div v-if="index===0"><ul class="list-disc pl-6"><li v-for="x in meta.missions" :key="x">{{ x }}</li></ul></div>
          <div v-else-if="index===1"><ul class="list-disc pl-6"><li v-for="x in meta.metrics" :key="x">{{ x }}</li></ul></div>
          <div v-else-if="index===2"><ul class="list-disc pl-6"><li v-for="x in meta.skills" :key="x">{{ x }}</li></ul></div>
          <div v-else-if="index===3"><div class="flex flex-wrap gap-2"><span v-for="x in meta.tools" :key="x" class="rounded-full border bg-white/70 px-3 py-1 text-sm">{{ x }}</span></div></div>
          <div v-else><ul class="list-disc pl-6"><li v-for="x in meta.paths" :key="x">{{ x }}</li></ul></div>
        </template>
      </Tabs>
    </div>

    <h2 class="mt-8 mb-2 text-xl font-semibold">相關指南</h2>
    <div class="grid gap-4 md:grid-cols-2">
      <RouterLink v-for="g in related" :key="g.id" :to="`/guides/${g.id}/edit`" class="card hover:shadow-lg">
        <p class="text-lg font-semibold">{{ g.title }}</p>
        <p class="line-clamp-2 text-slate-600" v-html="g.content"/>
      </RouterLink>
    </div>
    <h2 class="mt-12 mb-2 text-xl font-semibold">最佳搭檔與分工</h2>
    <SynergyGrid :items="pairItems" />

    <h2 class="mt-12 mb-2 text-xl font-semibold">逆流預防與對策</h2>
    <AntidoteList :scenes="antidotes.scenes" />
  </div>
</template>
