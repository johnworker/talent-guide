<template>
<div class="min-h-screen bg-slate-50">
<AppNav />
<RouterView />
<AppFooter />
</div>
</template>
<script setup>
import AppNav from '../src/components/AppNav.vue'
import AppFooter from '../src/components/AppFooter.vue'
</script>