<template>
  <section class="page">
    <header v-if="title || subtitle" class="mb-6">
      <h2 v-if="title" class="text-2xl font-bold tracking-tight">{{ title }}</h2>
      <p v-if="subtitle" class="mt-1 text-slate-600">{{ subtitle }}</p>
    </header>
    <slot />
  </section>
</template>
<script setup>
defineProps({ title: String, subtitle: String })
</script>
