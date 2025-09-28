<template>
  <label class="flex cursor-pointer items-center gap-2 rounded-xl border p-3 transition hover:shadow-sm"
         :class="checked ? 'bg-primary/5 border-primary/40' : 'bg-white/70'">
    <input :type="type" class="sr-only" :name="name" :value="value" v-model="model"  />
    <span class="inline-flex h-5 w-5 items-center justify-center rounded-full border"
          :class="checked ? 'bg-primary text-white border-primary' : 'bg-white text-transparent'">✓</span>
    <span class="select-none">{{ label }}</span>
  </label>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  modelValue: [String, Array, Object],
  value: [String, Object],
  label: String,
  type: { type: String, default: 'radio' }, // 'radio' | 'checkbox'
  name: String,
})
const emit = defineEmits(['update:modelValue'])
const model = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})
const checked = computed(() => {
  return Array.isArray(props.modelValue)
    ? props.modelValue.some(v => JSON.stringify(v) === JSON.stringify(props.value))
    : props.modelValue === props.value
})
</script>
