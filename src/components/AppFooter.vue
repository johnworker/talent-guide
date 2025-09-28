<template>
  <footer class="border-t bg-white/70 backdrop-blur">
    <div class="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-600 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <p>© {{ new Date().getFullYear() }} TalentGuide. All rights reserved.</p>
      <nav class="flex gap-4">
        <RouterLink to="/roles" class="hover:underline">角色</RouterLink>
        <RouterLink to="/guides" class="hover:underline">指南</RouterLink>
        <RouterLink to="/recommend" class="hover:underline">測驗</RouterLink>
      </nav>
    </div>
  </footer>
</template>

<script setup>
// 無邏輯，保持簡潔
</script>
