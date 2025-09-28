<template>
  <div class="min-h-screen bg-slate-50 relative">
    <GradientBlob class="left-[10%] top-[-80px]" />
    <GradientBlob class="right-[12%] top-[40vh]" color="from-accent/40 to-primary/40" />
    <AppNav />
    <main class="relative z-10"><slot /></main>
    <AppFooter />
  </div>
</template>
<script setup>
import AppNav from '@/components/AppNav.vue'
import AppFooter from '@/components/AppFooter.vue'
import GradientBlob from '@/components/ui/GradientBlob.vue'
</script>
