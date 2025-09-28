<template>
  <RouterLink :to="`/roles/${role.id}`" class="card hover:shadow-lg transition">
    <p class="text-lg font-semibold">{{ role.name }}</p>
    <p class="mt-1 text-slate-600">{{ role.intro }}</p>
    <div class="mt-2 flex flex-wrap gap-1 text-xs text-slate-500">
      <span v-for="k in role.keywords" :key="k" class="rounded bg-slate-100 px-2 py-0.5">#{{ k }}</span>
    </div>
  </RouterLink>
</template>
<script setup>
defineProps({ role: { type: Object, required: true } })
</script>