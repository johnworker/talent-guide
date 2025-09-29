<!-- src/pages/FAQ.vue -->
<template>
  <div class="page">
    <header class="mb-6">
      <h1 class="text-2xl font-bold tracking-tight">常見問題</h1>
      <p class="mt-1 text-slate-600">這裡整理了使用時最常見的疑問與解答。</p>
    </header>

    <div class="divide-y overflow-hidden rounded-2xl border bg-white/70">
      <details class="p-4">
        <summary class="cursor-pointer font-medium">測驗需要註冊嗎？結果會被保存嗎？</summary>
        <p class="mt-2 text-slate-600">不需要註冊即可做測驗，結果只在你的瀏覽器本機暫存。若想在不同裝置查看，建議註冊帳號以綁定。</p>
      </details>

      <details class="p-4">
        <summary class="cursor-pointer font-medium">怎麼解讀「前三名角色」？</summary>
        <p class="mt-2 text-slate-600">前三名代表你在不同情境下的優勢排序。建議先閱讀各角色解說，再到指南區挑一篇實作，把優勢轉成行動。</p>
        <div class="mt-3 flex gap-2">
          <RouterLink to="/roles" class="btn-outline">瀏覽角色</RouterLink>
          <RouterLink to="/guides" class="btn-primary">前往指南</RouterLink>
        </div>
      </details>

      <details class="p-4">
        <summary class="cursor-pointer font-medium">我可以自訂題目或調整權重嗎？</summary>
        <p class="mt-2 text-slate-600">之後會開放進階自訂與權重調整。目前可先用現成題庫完成初步定位。</p>
      </details>

      <details class="p-4">
        <summary class="cursor-pointer font-medium">指南可以分享給沒有帳號的同事嗎？</summary>
        <p class="mt-2 text-slate-600">可以。編輯頁面提供「公開閱讀連結」與 QR Code，對方不需登入即可閱讀。</p>
        <RouterLink to="/guides" class="btn-outline mt-3">看看有哪些指南</RouterLink>
      </details>

      <details class="p-4">
        <summary class="cursor-pointer font-medium">這個網站適合誰？</summary>
        <p class="mt-2 text-slate-600">想要更快找定位的人、需要分工協作的團隊、或希望把輸出流程化的自由工作者。</p>
      </details>
    </div>

    <!-- 行動區 -->
    <div class="mt-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-sky-50 p-5">
      <div>
        <h3 class="text-lg font-semibold">準備好了嗎？</h3>
        <p class="text-slate-600">先做一次測驗，看看你的前三名角色。</p>
      </div>
      <RouterLink to="/recommend" class="btn-primary">開始測驗</RouterLink>
    </div>
  </div>
</template>
