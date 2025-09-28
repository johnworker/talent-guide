<template>
  <div>
    <div class="flex flex-wrap gap-2 border-b">
      <button v-for="(t,i) in tabs" :key="i"
        class="rounded-t-xl px-4 py-2 text-sm"
        :class="i===modelValue ? 'bg-white border-x border-t' : 'text-slate-500 hover:text-ink'"
        @click="$emit('update:modelValue', i)">
        {{ typeof t==='string' ? t : t.label }}
      </button>
    </div>
    <div class="rounded-b-xl border-x border-b bg-white/70 p-4">
      <slot :index="modelValue" />
    </div>
  </div>
</template>
<script setup>
defineProps({ tabs: { type: Array, default: () => [] }, modelValue: { type: Number, default: 0 } })
defineEmits(['update:modelValue'])
</script>
