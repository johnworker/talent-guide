<template>
<div class="page">
<h1 class="text-2xl font-semibold">角色一覽</h1>
<div class="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
<RouterLink v-for="r in ROLES" :key="r.id" :to="`/roles/${r.id}`" class="card hover:shadow-lg">
<p class="text-lg font-semibold">{{ r.name }}</p>
<p class="text-slate-600">{{ r.intro }}</p>
<div class="mt-2 flex flex-wrap gap-1 text-xs text-slate-500">
<span v-for="k in r.keywords" :key="k" class="rounded bg-slate-100 px-2 py-0.5">#{{ k }}</span>
</div>
</RouterLink>
</div>
</div>
</template>
<script setup>
import { ROLES } from '@/lib/roles'
</script>