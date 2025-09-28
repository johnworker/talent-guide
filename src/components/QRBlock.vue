<template>
<div class="flex items-center gap-4">
<qrcode-vue :value="url" :size="128" />
<button class="btn-outline" @click="copy(url)">複製連結</button>
</div>
</template>
<script setup>
import QrcodeVue from 'qrcode.vue'
import useClipboard from '@/composables/useClipboard'
const props = defineProps({ url: String })
const { copy } = useClipboard()
</script>