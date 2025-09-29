<template>
  <section class="relative isolate overflow-hidden h-[480px]">
    <img :src="img" alt="" class="absolute inset-0 h-full w-full object-cover"
         :style="{ transform:`translateY(${y * 0.25}px)` }" />
    <div class="absolute inset-0 bg-black/30"></div>
    <div class="relative z-10 grid h-full place-items-center text-center text-white">
      <div class="px-6">
        <h1 class="text-5xl font-extrabold drop-shadow">{{ title }}</h1>
        <p class="mx-auto mt-3 max-w-2xl opacity-90">{{ subtitle }}</p>
        <div class="mt-8 flex justify-center gap-3">
                <RouterLink class="btn-primary" to="/recommend">開始測驗</RouterLink>

          <slot name="actions" />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
defineProps({ img:String, title:String, subtitle:String })
const y = ref(0)
const onScroll = () => { y.value = window.scrollY || 0 }
onMounted(()=> window.addEventListener('scroll', onScroll, { passive:true }))
onBeforeUnmount(()=> window.removeEventListener('scroll', onScroll))
</script>
