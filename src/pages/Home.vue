<template>
    <ParallaxHero
      img="/src/assets/hero.jpg"
      title="找到你的天賦位置"
      subtitle="八種角色 × 推薦測驗 × 精選指南，讓分工與成長更到位。">
      <template #actions>
        <RouterLink class="btn-primary" to="/recommend">開始測驗</RouterLink>
        <RouterLink class="btn-outline" to="/roles">瀏覽角色</RouterLink>
      </template>
    </ParallaxHero>

    <Section title="三步驟找到定位" subtitle="測驗 → 解說 → 行動指南">
      <div class="grid gap-4 md:grid-cols-3" v-reveal>
        <div class="glass p-6"><h3 class="text-lg font-semibold">快速測驗</h3><p class="text-slate-600">5 分鐘產出前三傾向。</p></div>
        <div class="glass p-6"><h3 class="text-lg font-semibold">角色解說</h3><p class="text-slate-600">優勢/盲點與適配任務。</p></div>
        <div class="glass p-6"><h3 class="text-lg font-semibold">行動指南</h3><p class="text-slate-600">具體任務清單與指標。</p></div>
      </div>
    </Section>

    <Section title="這個月的成效" subtitle="（示例數字，面試可替換成實際成效）">
      <div class="grid gap-4 md:grid-cols-3">
        <Metric :value="1280" label="完成測驗" />
        <Metric :value="356" label="收藏指南" />
        <Metric :value="92" label="建立新指南" />
      </div>
    </Section>

    <Section title="最新指南">
      <div class="grid gap-4 sm:grid-cols-2">
        <RouterLink v-for="g in latest" :key="g.id" :to="`/guides/${g.id}/edit`">
          <GuideCard :guide="g" />
        </RouterLink>
        <!-- 骨架 2 張 -->
        <GuideCard v-for="i in (latest.length?0:2)" :key="'s'+i" />
      </div>
    </Section>

    <SplitFeature eyebrow="方法論" title="角色語言，讓協作更快" img="/src/assets/hero.jpg">
      把抽象能力轉成可對話的角色，團隊對齊成本更低。
      <template #actions>
        <RouterLink to="/roles" class="btn-primary">查看 8 種角色</RouterLink>
      </template>
    </SplitFeature>
</template>
<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Section from '@/components/ui/Section.vue'
import ParallaxHero from '@/components/ui/ParallaxHero.vue'
import Metric from '@/components/ui/Metric.vue'
import SplitFeature from '@/components/ui/SplitFeature.vue'
import GuideCard from '@/components/GuideCard.vue'
import { useGuideStore } from '@/stores/guides'
import { onMounted, computed } from 'vue'
const store = useGuideStore()
onMounted(()=> store.fetch())
const latest = computed(()=> store.items.slice(0,4))
</script>
