<template>
  <div class="page">
    <h1 class="text-2xl font-bold">常見問題</h1>
    <input v-model="kw" placeholder="搜尋關鍵字（如：測驗、登入、分享）" class="mt-4 w-full rounded-xl border p-3"/>

    <div class="mt-4 divide-y rounded-2xl border bg-white/70">
      <div v-for="(q,i) in filtered" :key="q.id" class="p-4" :id="q.id">
        <details>
          <summary class="cursor-pointer font-medium">{{ q.q }}</summary>
          <div class="mt-2 text-slate-600 prose max-w-none" v-html="q.a"></div>
        </details>
        <div class="mt-2 text-right">
          <button class="text-xs text-slate-500 underline" @click="copyLink(q.id)">複製此題連結</button>
        </div>
      </div>
    </div>

    <p v-if="!filtered.length" class="mt-6 text-center text-slate-500">沒有符合的結果。</p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
const kw = ref('')
const list = [
  { id:'faq-save', q:'測驗結果會被儲存嗎？', a:'<p>預設不會上傳，僅在瀏覽器端運算。你也可登入後綁定到帳號。</p>' },
  { id:'faq-custom', q:'題目與權重能自訂嗎？', a:'<p>可以，調整 <code>src/lib/recommendation.js</code> 或 <code>questions.*.js</code> 即可。</p>' },
  { id:'faq-share', q:'指南能分享給未登入的朋友嗎？', a:'<p>可以，使用編輯頁下方的 QR 或連結，到 <code>/read/:id</code> 公開頁。</p>' },
  { id:'faq-login', q:'登入失敗怎麼辦？', a:'<p>確認帳密是否正確；此為示範站，帳號資料保存在你本機瀏覽器。</p>' },
  { id:'faq-deploy', q:'如何部署到 Netlify？', a:'<p>根目錄加入 <code>netlify.toml</code>，並在 Netlify 設定 build 指令與發佈資料夾。</p>' }
]
const filtered = computed(()=>{
  const k = kw.value.toLowerCase()
  if (!k) return list
  return list.filter(x => x.q.toLowerCase().includes(k) || x.a.toLowerCase().includes(k))
})
const copyLink = (id)=> {
  const url = `${location.origin}${location.pathname}#${id}`
  navigator.clipboard.writeText(url)
  alert('已複製連結')
}
</script>
