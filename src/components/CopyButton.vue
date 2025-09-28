<template>
  <button class="btn-outline" :data-clipboard-text="text" ref="btn">複製</button>
</template>
<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import ClipboardJS from 'clipboard'
import { toast } from 'vue3-toastify'

const props = defineProps({ text: String })
const btn = ref(null)
let clip

onMounted(() => {
  clip = new ClipboardJS(btn.value)
  clip.on('success', () => toast.success('已複製到剪貼簿'))
  clip.on('error', () => toast.error('複製失敗'))
})
onBeforeUnmount(() => clip && clip.destroy())
</script>
