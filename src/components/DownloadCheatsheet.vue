<template><button class="btn-outline" @click="download">下載角色速查表（CSV）</button></template>
<script setup>
import { toCSV } from '@/lib/role-cheatsheet'
const download = () => {
  const blob = new Blob([toCSV()], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob); const a = document.createElement('a')
  a.href = url; a.download = 'roles-cheatsheet.csv'; a.click(); URL.revokeObjectURL(url)
}
</script>
