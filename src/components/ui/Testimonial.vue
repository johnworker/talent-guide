<template>
  <figure class="card bg-white/70">
    <blockquote class="text-slate-700">“{{ quote }}”</blockquote>
    <figcaption class="mt-3 text-sm text-slate-500">— {{ name }}</figcaption>
  </figure>
</template>
<script setup>
defineProps({ quote:String, name:String })
</script>
