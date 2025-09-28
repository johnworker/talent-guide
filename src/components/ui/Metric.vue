<template>
  <div class="glass p-6 text-center">
    <div class="text-4xl font-extrabold tabular-nums">{{ display }}</div>
    <p class="mt-1 text-slate-600">{{ label }}</p>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
const props = defineProps({ value: {type:Number, default:0}, duration:{type:Number, default:900}, label:String })
const display = ref(0)
onMounted(()=>{
  const start = performance.now()
  const loop = (t)=>{
    const k = Math.min(1, (t - start) / props.duration)
    display.value = Math.round(props.value * k)
    if(k<1) requestAnimationFrame(loop)
  }
  requestAnimationFrame(loop)
})
</script>
