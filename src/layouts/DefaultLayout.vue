<template>
  <div class="min-h-screen relative bg-slate-50">
    <BackgroundLayer />
    <AppNav />
    <main class="relative z-10">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppNav from '@/components/AppNav.vue'
import AppFooter from '@/components/AppFooter.vue'
import BackgroundLayer from '@/components/ui/BackgroundLayer.vue'
</script>
