<template>
  <div class="card">
    <h3 class="mb-3 font-semibold">組合矩陣（滑過看重點）</h3>
    <div class="overflow-x-auto">
      <table class="min-w-full border-collapse">
        <thead><tr><th></th><th v-for="a in roles" :key="a.id" class="p-2 text-left text-sm">{{ a.name }}</th></tr></thead>
        <tbody>
          <tr v-for="r in roles" :key="r.id" class="border-t">
            <th class="p-2 text-sm text-left">{{ r.name }}</th>
            <td v-for="c in roles" :key="c.id" class="p-2">
              <div v-if="r.id!==c.id" class="rounded-lg border p-2 text-xs hover:shadow"
                   :title="pairTip(r.id,c.id)">
                {{ shortPair(r.id,c.id) }}
              </div>
              <div v-else class="text-center text-slate-400">—</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import combos from '@/data/role-combos.json'
import { ROLES as roles } from '@/lib/roles'
const tipMap = new Map(combos.map(x => [x.pair.sort().join('+'), x]))
const norm = (a,b)=> [a,b].sort().join('+')
const shortPair = (a,b)=> (roles.find(r=>r.id===a)?.name || a).slice(0,1) + '×' + (roles.find(r=>r.id===b)?.name || b).slice(0,1)
const pairTip = (a,b)=> {
  const x = tipMap.get(norm(a,b))
  return x ? `${x.title}\n優勢：${x.why}\n盲點：${x.pitfall}` : '尚無資料'
}
</script>
