<template>
  <div v-if="show" class="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
    <div v-for="i in 80" :key="i"
         class="absolute h-2 w-2"
         :style="style(i)"></div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
const props = defineProps({ duration: { type: Number, default: 1200 } })
const show = ref(false)
const style = (i) => {
  const left = Math.random()*100
  const delay = Math.random()*200
  const rotate = Math.random()*360
  const color = ['#0ea5e9','#22c55e','#f59e0b','#ef4444','#a78bfa'][i%5]
  return {
    left: left+'%',
    top: '-10px',
    background: color,
    transform: `rotate(${rotate}deg)`,
    animation: `fall ${800 + Math.random()*600}ms ease-in ${delay}ms both`,
  }
}
onMounted(() => {
  show.value = true
  setTimeout(()=> show.value = false, props.duration)
})
</script>
<style>
@keyframes fall {
  to { transform: translateY(110vh) rotate(720deg); opacity: .9 }
}
</style>
