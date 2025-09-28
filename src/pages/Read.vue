<template>
  <DefaultLayout>
    <Section>
      <article v-if="guide" class="prose max-w-none">
        <h1 class="mb-2 text-3xl font-bold">{{ guide.title }}</h1>
        <div class="text-sm text-slate-500">作者：{{ guide.author?.name || '匿名' }}｜更新：{{ new Date(guide.updatedAt).toLocaleDateString() }}</div>
        <div class="mt-6" v-html="guide.content" />
      </article>
      <p v-else class="text-slate-500">找不到內容。</p>
    </Section>
  </DefaultLayout>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import * as api from '@/lib/api'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Section from '@/components/ui/Section.vue'
const route = useRoute(); const guide = ref(null)
onMounted(async()=>{ guide.value = await api.getGuide(route.params.id) })
</script>
