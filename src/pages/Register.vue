<template>
  <div class="page">
    <div class="mx-auto max-w-md card">
      <h1 class="mb-4 text-2xl font-semibold">註冊</h1>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label class="block text-sm">名稱</label>
          <input
            v-model="name"
            type="text"
            class="mt-1 w-full rounded-xl border p-3"
            placeholder="你的名字"
            required
          />
        </div>

        <div>
          <label class="block text-sm">Email</label>
          <input
            v-model="email"
            type="email"
            class="mt-1 w-full rounded-xl border p-3"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label class="block text-sm">密碼</label>
          <input
            v-model="password"
            type="password"
            class="mt-1 w-full rounded-xl border p-3"
            placeholder="至少 6 碼"
            minlength="6"
            required
          />
        </div>

        <button class="btn-primary w-full" :disabled="loading">
          建立帳號
        </button>

        <p class="text-center text-sm text-slate-500">
          已有帳號？
          <RouterLink to="/login" class="underline">前往登入</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue3-toastify'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)

const onSubmit = async () => {
  if (!name.value || !email.value || !password.value) {
    return toast.error('請完整填寫')
  }
  try {
    loading.value = true
    await auth.register({
      name: name.value,
      email: email.value,
      password: password.value,
    })
    toast.success('註冊成功，已自動登入')
    router.push(route.query.redirect || '/dashboard')
  } catch (e) {
    toast.error(e.message || '註冊失敗')
  } finally {
    loading.value = false
  }
}
</script>
