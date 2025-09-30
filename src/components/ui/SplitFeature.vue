<template>
  <section class="page grid items-center gap-8 md:grid-cols-2">
    <div>
      <p v-if="eyebrow" class="text-sm text-slate-500">{{ eyebrow }}</p>
      <h2 class="text-3xl font-bold">{{ title }}</h2>
      <p class="mt-3 text-slate-600"><slot /></p>
      <div class="mt-4 flex gap-2"><slot name="actions" /></div>
    </div>
    <img :src="imgUrl" alt="" class="aspect-[4/3] w-full rounded-2xl object-cover shadow-soft" />
  </section>
</template>
<script setup>
import fallback from '@/assets/Narrative.jpg'

const props = defineProps({
  title: String,
  eyebrow: String,
  img: { type: String, default: '' }, // 傳 import 後的 url
})

const imgUrl = computed(() => props.img || fallback)

</script>
