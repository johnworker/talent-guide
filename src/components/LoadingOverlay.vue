<template>
  <transition name="fade">
    <div v-if="show" class="fixed inset-0 z-50 grid place-items-center bg-black/30">
      <div class="rounded-2xl bg-white px-6 py-4 shadow">
        <span class="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-primary align-[-2px]"></span>
        <span class="text-slate-700">載入中...</span>
      </div>
    </div>
  </transition>
</template>
<script setup>
defineProps({ show: Boolean })
</script>
<style scoped>
.fade-enter-active,.fade-leave-active{ transition: opacity .2s ease }
.fade-enter-from,.fade-leave-to{ opacity: 0 }
</style>
