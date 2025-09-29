<template>
  <Section title="角色一覽" subtitle="八大原型，幫你快速建立溝通語言">
    <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <RouterLink v-for="r in ROLES" :key="r.id" :to="`/roles/${r.id}`" class="card hover:shadow-glow">
        <p class="text-lg font-semibold">{{ r.name }}</p>
        <p class="text-slate-600 mt-1">{{ r.intro }}</p>
        <div class="mt-2 flex flex-wrap gap-1 text-xs text-slate-500">
          <span v-for="k in r.keywords" :key="k" class="rounded bg-slate-100 px-2 py-0.5">#{{ k }}</span>
        </div>
      </RouterLink>
    </div>
  </Section>
</template>
<script setup>
import Section from '@/components/ui/Section.vue'
import { ROLES } from '@/lib/roles'
</script>
