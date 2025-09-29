<template>
  <div class="page">
    <header class="mb-6">
      <h1 class="text-2xl font-bold tracking-tight">探索主題</h1>
      <p class="mt-1 text-slate-600">依角色與情境快速找到可操作的指南與文章。</p>
    </header>

    <!-- 快速篩選 -->
    <section class="mt-8 grid gap-3 md:grid-cols-4">
      <input v-model="q" placeholder="搜尋關鍵字..." class="rounded-xl border p-3" />
      <select v-model="role" class="rounded-xl border p-3">
        <option value="">全部角色</option>
        <option v-for="r in ROLES" :key="r.id" :value="r.id">{{ r.name }}</option>
      </select>
      <select v-model="type" class="rounded-xl border p-3">
        <option value="">全部類別</option>
        <option v-for="t in types" :key="t" :value="t">{{ t }}</option>
      </select>
      <select v-model="level" class="rounded-xl border p-3">
        <option value="">全部難度</option>
        <option v-for="lv in levels" :key="lv" :value="lv">{{ lv }}</option>
      </select>
    </section>

    <!-- 精選集合 -->
    <section class="mt-10">
      <h2 class="text-xl font-semibold">為你精選</h2>
      <div class="mt-4 grid gap-4 md:grid-cols-3">
        <RouterLink v-for="c in collections" :key="c.slug" :to="c.to" class="group overflow-hidden rounded-2xl border bg-white/70 shadow-soft transition hover:shadow-glow">
          <img :src="c.cover" class="h-32 w-full object-cover" alt="">
          <div class="p-4">
            <p class="text-xs uppercase tracking-wider text-slate-500">{{ c.badge }}</p>
            <h3 class="text-lg font-semibold group-hover:text-primary">{{ c.title }}</h3>
            <p class="mt-1 line-clamp-2 text-slate-600">{{ c.desc }}</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <Divider />
    <!-- 結果 -->
    <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <RouterLink
        v-for="g in paged"
        :key="g.id"
        :to="`/read/${g.id}`"
        class="card hover:shadow-glow transition block"
        :title="g.title">
        <p class="text-sm text-slate-500">{{ formatDate(g.updatedAt) }}</p>
        <h3 class="mt-1 text-lg font-semibold line-clamp-1">{{ g.title }}</h3>
        <div class="mt-2 text-slate-600 line-clamp-3" v-html="g.content"></div>
        <div class="mt-3 flex flex-wrap gap-2">
          <span v-for="r in g.roleIds" :key="r" class="rounded-full border bg-white/70 px-2 py-0.5 text-xs">
            {{ roleName(r) }}
          </span>
          <span v-for="t in g.tags || []" :key="t" class="rounded-full bg-slate-100 px-2 py-0.5 text-xs">#{{ t }}</span>
        </div>
      </RouterLink>
    </div>

    <!-- 卡片 -->
    <div class="grid gap-4 md:grid-cols-3">
      <article v-for="item in filtered" :key="item.slug" class="card hover:shadow-glow transition">
        <p class="text-xs uppercase tracking-wide text-slate-500">{{ item.topic }}</p>
        <h3 class="mt-1 text-lg font-semibold">{{ item.title }}</h3>
        <p class="mt-1 line-clamp-3 text-slate-600">{{ item.excerpt }}</p>
        <div class="mt-4 flex gap-2">
          <RouterLink v-if="item.roleId" :to="`/roles/${item.roleId}`" class="btn-outline">對應角色</RouterLink>
        </div>
      </article>
    </div>

    <!-- 分頁 -->
    <div class="mt-6 flex items-center justify-center gap-2">
      <button class="btn-outline" :disabled="page<=1" @click="page--">上一頁</button>
      <span class="text-sm text-slate-500">第 {{ page }} / {{ totalPages }} 頁</span>
      <button class="btn-outline" :disabled="page>=totalPages" @click="page++">下一頁</button>
    </div>

    <!-- CTA -->
    <div class="mt-8 text-center">
      <RouterLink to="/recommend" class="btn-primary">不知道從哪開始？先做測驗</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useGuideStore } from '@/stores/guides'
import { ROLES } from '@/lib/roles'
import GuideCard from '@/components/GuideCard.vue'
import Divider from '@/components/ui/Divider.vue'

const store = useGuideStore()
const q = ref(''); const role = ref(''); const type = ref(''); const level = ref('')

const types = ['playbook','workflow','sop','strategy','script']
const levels = ['beginner','intermediate','advanced']

// Demo 資料：你可改成從 API/JSON 取得
const items = [
  { slug:'creator-brand', title:'品牌敘事：從 30s 到 3min', topic:'品牌/內容', roleId:'creator', excerpt:'掌握 30 秒鉤子與 3 分鐘結構，讓內容更有轉化力。', to:'/articles/creator-output' },
  { slug:'merchant-funnel', title:'從流量到成交：四步漏斗', topic:'商業/營運', roleId:'merchant', excerpt:'價值主張、社會證明、CTA 與信任機制的組合拳。', to:'/articles/sales-playbook' },
  { slug:'technician-sre', title:'可靠度提升：SRE 小清單', topic:'工程/維運', roleId:'technician', excerpt:'可觀測性、告警分級、預案演練，讓系統更穩。', to:'/guides' },
  { slug:'supporter-cx', title:'客服到成長：角色轉職路徑', topic:'人才/發展', roleId:'supporter', excerpt:'從支持者起手，增能技師能力，搭配商人角色完成轉型。', to:'/cases' },
  { slug:'matchmaker-bd', title:'BD 開展：從關係到交易', topic:'商業/合作', roleId:'matchmaker', excerpt:'場景示例、關鍵話術與合作範本。', to:'/guides' },
  { slug:'star-personal', title:'個人品牌：曝光到變現', topic:'品牌/內容', roleId:'star', excerpt:'舞台感、社群節奏與產品化的三部曲。', to:'/articles/onboarding-with-roles' },
]

const topics = Array.from(new Set(items.map(i => i.topic)))

const topic = ref('')

const filtered = computed(() => {
  return items.filter(i => {
    const okRole = role.value ? i.roleId === role.value : true
    const okTopic = topic.value ? i.topic === topic.value : true
    return okRole && okTopic
  })
})

const reset = () => { role.value = ''; topic.value = '' }

onMounted(()=> store.fetch())

const results = computed(()=> {
  const kw = q.value.trim().toLowerCase()
  return store.items
    .filter(g => (!kw || g.title.toLowerCase().includes(kw) || g.content.toLowerCase().includes(kw)))
    .filter(g => (!role.value || g.roleIds?.includes(role.value)))
    .filter(g => (!type.value || g.type === type.value))
    .filter(g => (!level.value || g.level === level.value))
})

const collections = computed(()=> [
  {
    slug: 'starter-creator',
    title: '創作者入門包',
    desc: '從題庫到發佈的最小流程，一週內穩定輸出。',
    badge: 'Starter',
    cover: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=1200',
    to: '/roles/creator'
  },
  {
    slug: 'bd-kit',
    title: 'BD 拓展話術套件',
    desc: '聯繫與價值對齊腳本，一頁掌握五段流程。',
    badge: 'Playbook',
    cover: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=1200',
    to: '/roles/matchmaker'
  },
  {
    slug: 'ops-reliability',
    title: '可靠度 SLO 入門',
    desc: '用四個指標與門檻，建立最小可行維運。',
    badge: 'SOP',
    cover: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200',
    to: '/roles/technician'
  }
])
</script>