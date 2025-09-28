<template>
  <div class="card hover:shadow-glow transition">
    <h4 class="text-base font-semibold">{{ title }}</h4>
    <p class="mt-1 text-slate-600"><slot /></p>
    <ul v-if="actions?.length" class="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
      <li v-for="a in actions" :key="a">{{ a }}</li>
    </ul>
  </div>
</template>
<script setup>
const props = defineProps({ title: String, actions: Array })
</script>
