<template>
<header class="sticky top-0 z-40 border-b bg-white/70 backdrop-blur">
<nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
<RouterLink to="/" class="font-semibold">TalentGuide</RouterLink>
<div class="flex items-center gap-2">
<RouterLink to="/roles" class="btn-outline">角色</RouterLink>
<RouterLink to="/collab" class="btn-outline">合作</RouterLink>
<RouterLink to="/counterflow" class="btn-outline">逆流</RouterLink>
<RouterLink to="/guides" class="btn-outline">指南</RouterLink>
<RouterLink to="/recommend" class="btn-primary">測驗</RouterLink>
<!-- 導覽按鈕群中插入 -->
<RouterLink to="/explore" class="btn-outline">探索</RouterLink>
<RouterLink to="/faq" class="btn-outline">FAQ</RouterLink>
<template v-if="auth.isAuthed">
<RouterLink to="/dashboard" class="btn-outline">我的</RouterLink>
<button class="btn-outline" @click="auth.logout()">登出</button>
</template>
<template v-else>
<RouterLink to="/login" class="btn-outline">登入</RouterLink>
<RouterLink to="/register" class="btn-outline">註冊</RouterLink>
</template>
</div>
</nav>
</header>
</template>
<script setup>
import { useAuthStore } from '../stores/auth'
const auth = useAuthStore()
</script>