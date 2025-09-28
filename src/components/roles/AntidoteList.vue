<template>
  <div>
    <details v-for="s in data.scenes" :key="s.title" class="mb-3 rounded-xl border bg-white/70 p-4">
      <summary class="cursor-pointer font-medium">{{ s.title }}</summary>
      <p class="mt-2 text-sm text-slate-500">症狀：{{ s.signals.join('、') }}</p>
      <h4 class="mt-3 text-sm font-semibold">對策</h4>
      <ul class="list-disc pl-5">
        <li v-for="a in s.antidotes" :key="a">{{ a }}</li>
      </ul>
      <h4 class="mt-3 text-sm font-semibold">立即行動</h4>
      <ul class="list-disc pl-5 text-sm">
        <li v-for="q in s.quickWins" :key="q">{{ q }}</li>
      </ul>
    </details>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { getAntidotes } from '@/lib/antidote.js' // 讀取角色對策資料 :contentReference[oaicite:6]{index=6}
const props = defineProps({ roleId: String })
const data = computed(()=> getAntidotes(props.roleId) )
</script>
