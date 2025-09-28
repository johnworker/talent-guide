<template>
<TransitionRoot as="template" :show="open">
<Dialog class="relative z-50" @close="$emit('close')">
<TransitionChild enter="ease-out duration-200" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-150" leave-from="opacity-100" leave-to="opacity-0">
<div class="fixed inset-0 bg-black/30" />
</TransitionChild>
<div class="fixed inset-0 flex items-center justify-center p-4">
<TransitionChild enter="ease-out duration-200" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="ease-in duration-150" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
<DialogPanel class="card w-full max-w-md">
<DialogTitle class="mb-2 text-lg font-semibold">{{ title }}</DialogTitle>
<p class="text-slate-600">{{ message }}</p>
<div class="mt-4 flex justify-end gap-2">
<button class="btn-outline" @click="$emit('close')">取消</button>
<button class="btn-primary" @click="$emit('confirm')">確認</button>
</div>
</DialogPanel>
</TransitionChild>
</div>
</Dialog>
</TransitionRoot>
</template>
<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
const props = defineProps({ open:Boolean, title:String, message:String })
</script>