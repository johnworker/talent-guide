<template>
  <article class="group overflow-hidden rounded-2xl border bg-white/70 shadow-soft transition hover:shadow-glow">
    <img v-if="g.cover" :src="g.cover" class="h-40 w-full object-cover" alt="" />
    <div class="p-4">
      <div class="flex items-start justify-between gap-2">
        <h3 class="line-clamp-2 text-lg font-semibold">{{ g.title }}</h3>
        <button class="rounded-full border p-2 text-slate-500 hover:text-primary" @click.stop="toggle(g.id)">
          <span v-if="favSet.has(g.id)">★</span><span v-else>☆</span>
        </button>
      </div>
      <p class="mt-2 line-clamp-2 text-slate-600" v-html="g.content" />
      <div class="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <RoleBadge v-for="r in g.roleIds" :key="r">#{{ roleName(r) }}</RoleBadge>
        <span class="rounded-full bg-slate-100 px-2 py-0.5">{{ g.type }}</span>
        <span class="rounded-full bg-slate-100 px-2 py-0.5">Lv. {{ g.level }}</span>
        <span class="ml-auto">{{ g.readingTime }} 分鐘</span>
      </div>
    </div>
  </article>
</template>
<script setup>
import RoleBadge from '@/components/ui/RoleBadge.vue'
import { ROLES } from '@/lib/roles'
import { ref } from 'vue'
import useFavorites from '@/composables/useFavorites'

const props = defineProps({ g: Object })
const { favSet, toggle } = useFavorites()
const roleName = (id) => ROLES.find(r=>r.id===id)?.name || id
</script>
