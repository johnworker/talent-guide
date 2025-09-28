<template>
<div class="page">
<div class="mx-auto max-w-md card">
<h1 class="mb-4 text-2xl font-semibold">登入</h1>
<form @submit.prevent="onSubmit" class="space-y-4">
<div>
<label class="block text-sm">Email</label>
<input v-model="email" type="email" class="mt-1 w-full rounded-xl border p-3" required />
</div>
<div>
<label class="block text-sm">密碼</label>
<input v-model="password" type="password" class="mt-1 w-full rounded-xl border p-3" required />
</div>
<button class="btn-primary w-full" :disabled="loading">登入</button>
<p class="text-center text-sm text-slate-500">還沒有帳號？<RouterLink to="/register" class="underline">建立帳號</RouterLink></p>
</form>
</div>
</div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue3-toastify'


const email = ref('')
const password = ref('')
const loading = ref(false)
const auth = useAuthStore()
const router = useRouter(); const route = useRoute()


const onSubmit = async () => {
try{
loading.value = true
await auth.login(email.value, password.value)
toast.success('歡迎回來！')
router.push(route.query.redirect || '/dashboard')
}catch(e){ toast.error(e.message) }
finally{ loading.value = false }
}
</script>