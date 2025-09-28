<template>
  <div class="group card bg-white/70 backdrop-blur-xs hover:shadow-glow transition">
    <div class="mb-2 flex items-center gap-2">
      <slot name="icon" />
      <h3 class="text-lg font-semibold">{{ title }}</h3>
    </div>
    <p class="text-slate-600">{{ desc }}</p>
  </div>
</template>
<script setup>
defineProps({ title:String, desc:String })
</script>
