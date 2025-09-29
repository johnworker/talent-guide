<template>
  <Disclosure v-slot="{ open }" as="div" class="rounded-2xl border bg-white/70 p-4">
    <DisclosureButton class="flex w-full items-center justify-between text-left">
      <span class="font-medium">{{ title }}</span>
      <svg class="h-5 w-5 transition" :class="open ? 'rotate-180' : ''" viewBox="0 0 20 20"><path fill="currentColor" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z"/></svg>
    </DisclosureButton>
    <DisclosurePanel class="mt-2 text-slate-600">
      <slot />
    </DisclosurePanel>
  </Disclosure>
</template>
<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
const props = defineProps({ title: String })
</script>
