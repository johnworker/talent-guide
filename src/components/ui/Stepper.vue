<template>
  <div class="flex items-center gap-2">
    <div v-for="i in total" :key="i" class="h-2 flex-1 rounded bg-slate-200 overflow-hidden">
      <div class="h-full" :class="i<=active ? 'bg-primary' : 'bg-transparent'"></div>
    </div>
    <span class="ml-2 text-xs text-slate-500">{{ active }} / {{ total }}</span>
  </div>
</template>
<script setup>
defineProps({ active: Number, total: Number })
</script>
