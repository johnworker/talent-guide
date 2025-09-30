<template class=" text-primary">
  <!-- HERO：視差主視覺 -->
  <Section>
    <ParallaxHero
      img :src="heroUrl"
      title="找到你的天賦位置"
      subtitle="8 種角色 × 推薦測驗 × 實作指南 — 快速對齊你的工作與專案分工"
      />
  </Section>

  <!-- 熱門角色捷徑（膠囊徽章） -->
  <Section title="熱門角色捷徑" subtitle="用你最有感的角色開始探索">
    <div class="flex flex-wrap gap-2">
      <RouterLink
        v-for="r in ROLES"
        :key="r.id"
        :to="`/roles/${r.id}`"
        class="inline-flex items-center gap-2 rounded-full border bg-white/70 px-4 py-2 text-sm shadow-sm hover:shadow-glow transition"
        v-reveal
      >
        <Icon :name="r.icon" class="h-4 w-4 text-primary" />
        {{ r.name }}
      </RouterLink>
    </div>
  </Section>

  <!-- 三步驟 -->
  <Section title="三步驟找到定位" subtitle="測驗 → 解說 → 行動指南">
    <div class="grid gap-4 md:grid-cols-3">
      <FeatureCard
        title="快速測驗"
        desc="5 分鐘完成，初步鎖定你的前三角色。"
        v-reveal
      >
        <template #icon>
          <Icon name="SparklesIcon" class="h-6 w-6 text-primary" />
        </template>
      </FeatureCard>
      <FeatureCard
        title="角色解說"
        desc="了解你的優勢、盲點與適配任務。"
        v-reveal
      >
        <template #icon>
          <Icon name="BookOpenIcon" class="h-6 w-6 text-primary" />
        </template>
      </FeatureCard>
      <FeatureCard
        title="行動指南"
        desc="照表操課：推薦技能、工具與下一步。"
        v-reveal
      >
        <template #icon>
          <Icon name="CheckCircleIcon" class="h-6 w-6 text-primary" />
        </template>
      </FeatureCard>
    </div>

    <div class="mt-6 flex justify-center gap-3">
      <RouterLink class="btn-primary" to="/recommend">開始測驗</RouterLink>
      <RouterLink class="btn-outline" to="/roles">瀏覽角色</RouterLink>
    </div>
  </Section>

  <!-- 指標區（自動滾動數字） -->
  <Section title="大家都在用" subtitle="真實內容 × 易上手方法">
    <div class="grid gap-4 md:grid-cols-4">
      <Metric label="完成測驗" :to="3200" suffix="+" />
      <Metric label="公開指南" :to="86" />
      <Metric label="團隊採用" :to="24" />
      <Metric label="滿意度" :to="97" suffix="%" />
    </div>
  </Section>

  <!-- 雙欄敘事（雜誌風） -->
  <SplitFeature
    title="角色語言讓協作更快"
    eyebrow="方法論"
    img="/src/assets/Narrative.jpg"
  >
    把抽象能力轉成可對話的角色，團隊對齊成本更低；我們用題目幫你找到前三名，並用指南把「知道」變成「做到」。
    <template #actions>
      <RouterLink class="btn-primary" to="/roles">查看 8 種角色</RouterLink>
      <RouterLink class="btn-outline" to="/articles">延伸閱讀</RouterLink>
    </template>
  </SplitFeature>

  <!-- 精選主題 -->
  <Section title="精選主題" subtitle="依角色與情境探索內容" >
    <div class="grid gap-4 md:grid-cols-3">
      <RouterLink class="card hover:shadow-glow" to="/roles/creator" v-reveal>
        <h3 class="text-lg font-semibold">創作者：品牌與內容</h3>
        <p class="text-slate-600">爆款內容的結構、設計資源清單、常用工具。</p>
      </RouterLink>
      <RouterLink class="card hover:shadow-glow" to="/roles/merchant" v-reveal>
        <h3 class="text-lg font-semibold">商人：從 0 到 1 的 PMF</h3>
        <p class="text-slate-600">定價、漏斗、轉化追蹤與案例。</p>
      </RouterLink>
      <RouterLink
        class="card hover:shadow-glow"
        to="/roles/technician"
        v-reveal
      >
        <h3 class="text-lg font-semibold">技師：可靠與效率</h3>
        <p class="text-slate-600">工程提效、維運 SOP、實用腳本。</p>
      </RouterLink>
    </div>
  </Section>

  <!-- 最新指南（用現有 Guides 列表） -->
  <Section title="最新指南" subtitle="連結到角色解說與公開閱讀">
    <GuidesList compact />
  </Section>

  <!-- 使用者回饋 -->
  <Section title="使用者回饋">
    <div class="grid gap-4 md:grid-cols-3">
      <Testimonial
        quote="測驗後我在專案裡換了分工，效率直接提升。"
        name="Iris・創作者"
      />
      <Testimonial
        quote="角色解說很實用，知道該補哪些技能。"
        name="Wayne・技師"
      />
      <Testimonial quote="BD 開展更順手，指南很好用。" name="Paul・媒合者" />
    </div>
  </Section>

  <!-- 跑馬燈（品牌關鍵字） -->
  <Section>
    <Marquee>
      <span class="px-4 text-slate-500"># 商業設計</span>
      <span class="px-4 text-slate-500"># 前端工程</span>
      <span class="px-4 text-slate-500"># 產品營運</span>
      <span class="px-4 text-slate-500"># 夥伴開發</span>
      <span class="px-4 text-slate-500"># 個人品牌</span>
    </Marquee>
  </Section>
</template>

<script setup>
import { ROLES } from "@/lib/roles";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import ParallaxHero from "@/components/ui/ParallaxHero.vue";
import Section from "@/components/ui/Section.vue";
import FeatureCard from "@/components/ui/FeatureCard.vue";
import SplitFeature from "@/components/ui/SplitFeature.vue";
import Metric from "@/components/ui/Metric.vue";
import Testimonial from "@/components/ui/Testimonial.vue";
import Marquee from "@/components/ui/Marquee.vue";
import Icon from "@/components/ui/Icon.vue";
import heroUrl from '@/assets/hero.jpg'   // ← 以模組方式載圖，Vite 會正確處理路徑


// 已有 Guides.vue 的列表邏輯，直接當子元件使用
import GuidesList from "@/pages/Guides.vue";
</script>
