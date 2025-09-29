<template>
  <component :is="icon" class="h-6 w-6" />
</template>
<script setup>
import { computed } from 'vue'
import * as H from '@heroicons/vue/24/solid'
const props = defineProps({ name: { type: String, default: 'SparklesIcon' } })
const icon = computed(() => H[props.name] || H.SparklesIcon)
</script>
