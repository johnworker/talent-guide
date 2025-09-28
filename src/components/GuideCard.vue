<template>
  <article class="card hover:shadow-glow transition relative">
    <button v-if="guide" class="absolute right-3 top-3 rounded-full border bg-white/80 px-3 py-1 text-sm"
            @click.stop="toggleFav(guide.id)">{{ isFav ? '★' : '☆' }}</button>
    <template v-if="guide">
      <h3 class="text-lg font-semibold">{{ guide.title }}</h3>
      <p class="mt-1 line-clamp-3 text-slate-600" v-html="guide.content"></p>
    </template>
    <template v-else>
      <div class="animate-pulse space-y-3">
        <div class="h-5 w-2/3 rounded bg-slate-200"></div>
        <div class="h-4 w-full rounded bg-slate-200"></div>
        <div class="h-4 w-5/6 rounded bg-slate-200"></div>
      </div>
    </template>
  </article>
</template>
<script setup>
import { computed } from 'vue'
import { useFavorites } from '@/composables/useFavorites'
const props = defineProps({ guide:Object })
const { isFavorite, toggle } = useFavorites('tg_fav_guides')
const isFav = computed(()=> props.guide ? isFavorite(props.guide.id) : false)
const toggleFav = (id)=> toggle(id)
</script>
