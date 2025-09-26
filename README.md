talent-guide/
├─ index.html
├─ package.json
├─ postcss.config.cjs
├─ tailwind.config.js
├─ vite.config.ts (或 vite.config.js)
└─ src/
├─ main.js # 入口，註冊 Router / Pinia / Toast / 全域樣式
├─ index.css # Tailwind 載入與自訂樣式
├─ router/
│ └─ index.js # 路由表與路由守衛(meta.requiresAuth)
├─ stores/
│ ├─ auth.js # 登入狀態、JWT 模擬、使用者資料
│ ├─ guides.js # 指南 CRUD 狀態
│ └─ ui.js # 全域 UI：loading、modal 狀態
├─ lib/
│ ├─ api.js # 模擬 API（localStorage + Promise），集中資料存取
│ ├─ recommendation.js # 推薦規則引擎（根據問答算分）
│ └─ roles.js # 8 種角色定義（文案、icon、關鍵字）
├─ composables/
│ ├─ useClipboard.js # Clipboard.js 封裝
│ └─ useAuthGuard.js # 可在元件層檢查權限
├─ components/
│ ├─ AppNav.vue # 導覽列（登入/登出、搜尋）
│ ├─ AppFooter.vue # 頁腳
│ ├─ LoadingOverlay.vue # 全頁 loading 狀態
│ ├─ ConfirmModal.vue # 共用 Modal（Headless UI）
│ ├─ RoleCard.vue # 角色卡片（首頁/列表共用）
│ ├─ RichText.vue # Tiptap 富文字
│ ├─ QRBlock.vue # qrcode.vue 產生分享碼
│ └─ CopyButton.vue # 一鍵複製連結
├─ pages/
│ ├─ Home.vue # 首頁：主視覺＋角色導覽
│ ├─ Roles.vue # 角色列表＋篩選（雜誌/卡片式）
│ ├─ RoleDetail.vue # 角色解說（對應 roles.js 文案）
│ ├─ Recommend.vue # 推薦測驗（問答→結果）
│ ├─ Guides.vue # 指南列表（可搜尋/收藏）
│ ├─ GuideEditor.vue # 指南建立/編輯（CRUD + 富文字 + QR + 複製）
│ ├─ Dashboard.vue # 個人中心（我的指南、收藏、設定）
│ ├─ Login.vue # 登入
│ ├─ Register.vue # 註冊
│ └─ NotFound.vue # 404
├─ assets/
│ ├─ logo.svg
│ └─ hero.jpg # 首頁主視覺
└─ styles/ (可選) # 若想分離元件樣式