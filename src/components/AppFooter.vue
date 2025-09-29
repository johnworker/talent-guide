<template>
  <footer class="mt-16 border-t bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
    <div class="container grid gap-8 py-10 md:grid-cols-4">
      <!-- 品牌 -->
      <div>
        <div class="flex items-center gap-2">
          <img src="@/assets/logo.svg" alt="TalentGuide" class="h-7 w-auto" />
          <span class="sr-only">TalentGuide</span>
        </div>
        <p class="mt-3 text-sm text-slate-600">
          找到你的天賦位置，讓協作更快、產出更穩定。
        </p>
        <div class="mt-4 flex gap-3 text-slate-500">
          <a href="#" class="footer-link" aria-label="Twitter">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor"><path d="M..."/></svg>
          </a>
          <a href="#" class="footer-link" aria-label="GitHub">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor"><path d="M..."/></svg>
          </a>
          <a href="#" class="footer-link" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor"><path d="M..."/></svg>
          </a>
        </div>
      </div>

      <!-- 導覽 -->
      <nav>
        <p class="text-sm font-semibold text-slate-500">導覽</p>
        <ul class="mt-3 space-y-2 text-sm">
          <li><RouterLink to="/explore" class="footer-link">探索主題</RouterLink></li>
          <li><RouterLink to="/roles" class="footer-link">角色一覽</RouterLink></li>
          <li><RouterLink to="/guides" class="footer-link">指南</RouterLink></li>
          <li><RouterLink to="/recommend" class="footer-link">推薦測驗</RouterLink></li>
        </ul>
      </nav>

      <!-- 資源 -->
      <nav>
        <p class="text-sm font-semibold text-slate-500">資源</p>
        <ul class="mt-3 space-y-2 text-sm">
          <li><RouterLink to="/faq" class="footer-link">常見問題</RouterLink></li>
          <li><RouterLink to="/about" class="footer-link">關於我們</RouterLink></li>
          <li><RouterLink to="/cases" class="footer-link">案例研究</RouterLink></li>
        </ul>
      </nav>

      <!-- 訂閱 -->
      <div>
        <p class="text-sm font-semibold text-slate-500">訂閱電子報</p>
        <form class="mt-3 flex gap-2" @submit.prevent="noop">
          <input type="email" placeholder="you@email"
                 class="w-full rounded-xl border px-3 py-2 focus:border-sky-400 focus:ring-sky-400/30" />
          <button class="btn-primary">訂閱</button>
        </form>
        <p class="mt-2 text-xs text-slate-500">每月一次，最新指南與實用範本。</p>
      </div>
    </div>

    <!-- 版權列 -->
    <div class="border-t">
      <div class="container flex flex-col items-center justify-between gap-3 py-5 text-sm text-slate-500 md:flex-row">
        <p>© {{ year }} TalentGuide. All rights reserved.</p>
        <div class="flex gap-4">
          <RouterLink to="/terms" class="footer-link">服務條款</RouterLink>
          <RouterLink to="/privacy" class="footer-link">隱私權政策</RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
const noop = () => {}
</script>
