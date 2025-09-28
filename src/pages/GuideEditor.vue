<template>
<div class="page">
<div class="flex items-center justify-between">
<h1 class="text-2xl font-semibold">{{ isEdit ? '編輯指南' : '建立指南' }}</h1>
<RouterLink to="/guides" class="btn-outline">返回列表</RouterLink>
</div>


<form class="mt-6 space-y-4" @submit.prevent="save">
<input v-model="title" placeholder="指南標題" class="w-full rounded-xl border p-3"/>


<div>
<label class="mb-2 block text-sm">適合的角色（可多選）</label>
<div class="flex flex-wrap gap-2">
<label v-for="r in ROLES" :key="r.id" class="inline-flex items-center gap-2 rounded-xl border px-3 py-1">
<input type="checkbox" :value="r.id" v-model="roleIds"> {{ r.name }}
</label>
</div>
</div>


<RichText v-model="content" />


<div class="flex gap-2">
<button class="btn-primary" type="submit">儲存</button>
<button v-if="isEdit" class="btn-outline" type="button" @click="del">刪除</button>
</div>
</form>


<div v-if="isEdit" class="mt-8 card">
<h2 class="mb-2 font-semibold">分享</h2>
<QRBlock :url="shareUrl" />
</div>
</div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RichText from '@/components/RichText.vue'
import QRBlock from '@/components/QRBlock.vue'
import { ROLES } from '@/lib/roles'
import * as api from '@/lib/api'
import { useGuideStore } from '@/stores/guides'
import { toast } from 'vue3-toastify'


const route = useRoute(); const router = useRouter()
const store = useGuideStore()
const isEdit = computed(()=>!!route.params.id)


const title = ref('')
const content = ref('')
const roleIds = ref([])


const shareUrl = computed(()=> location.origin + '/guides/' + route.params.id)


onMounted(async()=>{
if (isEdit.value) {
const g = await api.getGuide(route.params.id)
if (!g) return router.replace('/guides')
title.value = g.title; content.value = g.content; roleIds.value = g.roleIds
}
})


const save = async () => {
try{
if (!title.value) throw new Error('請輸入標題')
if (isEdit.value) {
await store.update(route.params.id, { title: title.value, content: content.value, roleIds: roleIds.value })
toast.success('已更新')
} else {
const g = await store.create({ title: title.value, content: content.value, roleIds: roleIds.value })
toast.success('建立成功')
router.replace(`/guides/${g.id}/edit`)
}
}catch(e){ toast.error(e.message) }
}


const del = async () => {
if (!confirm('確定刪除？')) return
await store.remove(route.params.id)
toast.success('已刪除')
router.push('/guides')
}
</script>