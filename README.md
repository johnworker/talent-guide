talent-guide/
├─ .github
|   └─ workflows/
|       └─ deploy.yml
├─ index.html
├─ package.json
├─ postcss.config.cjs
├─ tailwind.config.js
├─ vite.config.ts (或 vite.config.js)
└─ src/
    ├─ main.js # 入口，註冊 Router / Pinia / Toast / 全域樣式
    ├─ App.vue
    ├─ index.css # Tailwind 載入與自訂樣式
    ├─ router/
    │ └─ index.js # 路由表與路由守衛(meta.requiresAuth)
    ├─ layouts/
    │ └─ DefaultLayout.vue
    ├─ stores/
    │ ├─ auth.js # 登入狀態、JWT 模擬、使用者資料
    │ ├─ guides.js # 指南 CRUD 狀態
    │ └─ ui.js # 全域 UI：loading、modal 狀態
    ├─ lib/
    │ ├─ api.js # 模擬 API（localStorage + Promise），集中資料存取
    │ ├─ recommendation.js # 推薦規則引擎（根據問答算分）
    │ ├─ role-cheatsheet.js
    │ ├─ questions.weighted.js    # 題組 + 權重 + 多選 題庫
    │ ├─ questions.single.js   # 逐題單選版題庫（56 題）
    │ ├─ combination.js          # 根據前三名計算搭檔/三人小隊/團隊結構建議
    │ ├─ antidote.js             # 逆流（失衡）偵測與對策
    │ └─ roles.js # 8 種角色定義（文案、icon、關鍵字）
    ├─ composables/
    │ ├─ useClipboard.js # Clipboard.js 封裝
    │ ├─ useFavorites.js
    │ ├─ useLocalStore.js
    │ └─ useAuthGuard.js # 可在元件層檢查權限
    ├─ components/
    | |     |   └─ ui/
    | |     |    ├─ GradientBlob.vue
    | |     |    ├─ Section.vue
    | |     |    ├─ FeatureCard.vue
    | |     |    ├─ RoleBadge.vue
    | |     |    ├─ Testimonial.vue
    | |     |    ├─ ParallaxHero.vue
    | |     |    ├─ Metric.vue
    | |     |    ├─ SplitFeature.vue
    | |     |    ├─ Tabs.vue
    | |     |    ├─ Stepper.vue
    | |     |    ├─ Confetti.vue      # 輕量彩帶動畫（結果時播放）
    | |     |    ├─ PersonaChip.vue      # 角色膠囊（帶顏色與 icon）
    | |     |    ├─ TipCard.vue          # 小貼士卡片（標題/內文/行動）
    | |     |    ├─ Accordion.vue
    | |     |    ├─ Divider.vue
    | |     |    ├─ RoleBadge.vue
    | |     |    ├─ Icon.vue
    | |     |    ├─ ParallaxHero.vue
    | |     |    ├─ BackgroundLayer.vue
    | |     |    └─ Marquee.vue
    | |     ├─ charts/
    | |     |    └─ Radar.vue
    | |     ├─ forms/
    | |     |    └─ OptionPill.vue
    | |     └─ roles/
    | |          ├─ SynergyGrid.vue      # 互動式組合卡矩陣（滑過顯示重點）
    | |          └─ AntidoteList.vue     # 逆流清單（手風琴+即刻行動）
    | |
    │ ├─ AppNav.vue # 導覽列（登入/登出、搜尋）
    │ ├─ AppFooter.vue # 頁腳
    │ ├─ LoadingOverlay.vue # 全頁 loading 狀態
    │ ├─ ConfirmModal.vue # 共用 Modal（Headless UI）
    │ ├─ RoleCard.vue # 角色卡片（首頁/列表共用）
    │ ├─ RichText.vue # Tiptap 富文字   
    │ ├─ QRBlock.vue # qrcode.vue 產生分享碼
    │ ├─ DownloadCheatsheet.vue
    │ ├─ GuideCard.vue
    │ └─ CopyButton.vue # 一鍵複製連結
    ├─ pages/
    │ ├─ Home.vue # 首頁：主視覺＋角色導覽
    │ ├─ About.vue
    │ ├─ Explore.vue
    │ ├─ FAQ.vue
    │ ├─ Read.vue # 指南公開閱讀頁
    │ ├─ Roles.vue # 角色列表＋篩選（雜誌/卡片式）
    │ ├─ RoleDetail.vue # 角色解說（對應 roles.js 文案）
    │ ├─ Recommend.vue # 推薦測驗（問答→結果）
    │ ├─ Guides.vue # 指南列表（可搜尋/收藏）
    │ ├─ GuideEditor.vue # 指南建立/編輯（CRUD + 富文字 + QR + 複製）
    │ ├─ Dashboard.vue # 個人中心（我的指南、收藏、設定）
    │ ├─ Login.vue # 登入
    │ ├─ Register.vue # 註冊
    │ ├─ Collab.vue              # 合作組合實驗室（拖拉三選二，生成分工）
    │ ├─ Counterflow.vue         # 逆流應對指南（依角色/情境檢索）
    │ └─ NotFound.vue # 404
    ├─ assets/
    │ ├─ logo.svg
    │ └─ hero.jpg # 首頁主視覺
    ├─ styles/  # 若想分離元件樣式
    │ └─ prose.css
    ├─ directives/
    | └─ reveal.js
    └─ data/
        ├─ roles.meta.json
        ├─ role-combos.json        # 角色×角色 組合知識庫（搭配優勢/盲點/任務分工）
        ├─ role-anti.json          # 各角色常見逆流情境與對策
        └─ guides.sample.json
