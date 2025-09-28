<template>
  <div :class="['pointer-events-none absolute -z-10 h-[360px] w-[360px] rounded-full blur-3xl opacity-60 animate-float', gradient]" />
</template>
<script setup>
const props = defineProps({ color: { default: 'from-primary/30 to-accent/30' } })
const gradient = `bg-gradient-to-tr ${props.color}`
</script>
