<template>
  <div class="page">
    <h1 class="text-2xl font-semibold">天賦推薦測驗</h1>
    <p class="mt-1 text-slate-600">
      單選題、一次一題。完成全部題目後產生你的前三名角色。
    </p>

    <!-- 進度 -->
    <div class="mt-4">
      <div class="flex items-center justify-between text-sm text-slate-600">
        <span>第 {{ index + 1 }} / {{ TOTAL }} 題</span>
        <span v-if="!finished">已作答：{{ answeredCount }} / {{ TOTAL }}</span>
        <span v-else>完成！</span>
      </div>
      <div class="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          class="h-full bg-primary transition-all"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
    </div>

    <!-- 只允許一個直屬子節點的 Transition 包裹 -->
    <Transition name="fade" mode="out-in">
      <div :key="finished ? 'result' : current?.id">
        <!-- 題目（一次只顯示一題） -->
        <div v-if="!finished" class="mt-6 card">
          <p class="mb-4 text-lg font-medium">{{ current.text }}</p>
          <form @submit.prevent="next">
            <div class="grid gap-2 md:grid-cols-2">
              <label
                v-for="o in current.options"
                :key="o.value || o.role || o.label"
                class="flex cursor-pointer items-center gap-2 rounded-xl border p-3 hover:shadow"
                :class="{
                  'ring-2 ring-primary': selected === (o.value || o.role),
                }"
              >
                <input
                  class="h-4 w-4"
                  type="radio"
                  :name="current.id"
                  :value="o.value || o.role"
                  v-model="selected"
                />
                <span>{{ o.label }}</span>
              </label>
            </div>

            <div class="mt-4 flex justify-between gap-2">
              <button
                type="button"
                class="btn-outline"
                @click="prev"
                :disabled="index === 0"
              >
                上一題
              </button>

              <div class="flex gap-2">
                <button type="button" class="btn-outline" @click="skip">
                  稍後再答
                </button>
                <button class="btn-primary" type="submit">
                  {{ isLast ? "看結果" : "下一題" }}
                </button>
              </div>
            </div>
          </form>
        </div>

        <!-- 結果 -->
        <div v-else class="mt-10 grid gap-6 md:grid-cols-2">
          <div class="card">
            <h2 class="mb-3 text-xl font-semibold">你的前三名</h2>
            <div class="space-y-2">
              <RouterLink
                v-for="r in result"
                :key="r.roleId"
                :to="`/roles/${r.roleId}`"
                class="block rounded-xl border p-3 hover:shadow-lg"
              >
                <p class="text-sm text-slate-500">分數：{{ r.score }}</p>
                <p class="mt-1 text-lg font-semibold">
                  {{ r.role?.name || r.roleId }}
                </p>
                <p class="text-slate-600 line-clamp-2">{{ r.role?.intro }}</p>
              </RouterLink>
            </div>

            <div class="mt-4 flex items-center gap-2">
              <button class="btn-outline" @click="restart">重新測驗</button>
              <RouterLink class="btn-primary" to="/roles"
                >瀏覽全部角色</RouterLink
              >
            </div>
          </div>

          <div class="card">
            <h2 class="mb-3 text-xl font-semibold">下一步建議</h2>
            <ul class="list-disc pl-5 text-slate-700 space-y-1">
              <li>點進角色頁，查看「任務/指標/工具」與相關指南。</li>
              <li>把前三名加入你的專案分工，先做擅長的事。</li>
              <li>針對弱項，從指南挑 1–2 個動作立刻實作。</li>
            </ul>

            <div class="md:col-span-2 grid gap-6 md:grid-cols-2">
              <div class="card">
                <h3 class="mb-2 font-semibold">推薦合作組合</h3>
                <div
                  v-for="c in combos"
                  :key="c.title"
                  class="rounded-xl border p-3 mb-2"
                >
                  <p class="text-sm text-slate-500">
                    {{ c.pairDetail.map((x) => x.name).join(" × ") }}
                  </p>
                  <p class="font-semibold">{{ c.title }}</p>
                  <p class="text-slate-600">{{ c.why }}</p>
                </div>
                <RouterLink class="btn-outline mt-2" to="/collab"
                  >打開組合實驗室</RouterLink
                >
              </div>
              <div class="card">
                <h3 class="mb-2 font-semibold">
                  可能的逆流情境（{{ firstName }}）
                </h3>
                <ul class="space-y-2">
                  <li
                    v-for="s in antiTop"
                    :key="s.title"
                    class="rounded-xl border p-3"
                  >
                    <b>{{ s.title }}</b>
                    <p class="text-sm text-slate-600 mt-1">
                      症狀：{{ s.signals.join("、") }}
                    </p>
                  </li>
                </ul>
                <RouterLink
                  class="btn-outline mt-2"
                  :to="{ name: 'counterflow' }"
                  >查看完整對策</RouterLink
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { scoreToRoles } from "@/lib/recommendation";
import { ROLES } from "@/lib/roles";
import { topCombos } from '@/lib/combination.js' // 由 role-combos.json 提供資料 :contentReference[oaicite:7]{index=7}
import { getAntidotes } from '@/lib/antidote.js'  // 由 role-anti.json 提供資料  :contentReference[oaicite:8]{index=8}

/**
 * 題庫通用匯入：
 * - 若 questions.single.js 是 `export default [...]` → 用 QS.default
 * - 若是 `export const QUESTIONS = [...]` → 用 QS.QUESTIONS
 * - 其餘命名（questions/items）也做相容處理
 */
import * as QS from "@/lib/questions.single.js";
const QUESTIONS = Array.isArray(QS.default)
  ? QS.default
  : QS.QUESTIONS || QS.questions || QS.items || [];

const router = useRouter();

// ===== 狀態 =====
const answers = reactive({}); // { [qid]: 'roleId' }
const index = ref(0); // 目前題號
const finished = ref(false); // 是否完成
const result = ref([]); // 排名結果（前三）
const selected = ref(""); // 當前題目的暫存選擇

// 衍生：合作組合（取前3計算）、逆流（以第一名角色預警）
const combos = computed(()=> topCombos(result.value).slice(0,3))
const firstName = computed(()=> ROLES.find(r=>r.id===result.value?.[0]?.roleId)?.name || '—')
const antiTop = computed(()=> {
  const rid = result.value?.[0]?.roleId
  if(!rid) return []
  return (getAntidotes(rid).scenes || []).slice(0,2)
})

// ===== 衍生 =====
const TOTAL = QUESTIONS.length;
const current = computed(() => QUESTIONS[index.value]);
const isLast = computed(() => index.value === TOTAL - 1);
const answeredCount = computed(() => Object.keys(answers).length);
const progress = computed(() =>
  Math.round((answeredCount.value / TOTAL) * 100)
);

// 初始與切換題目時，同步選擇狀態
watch(
  index,
  () => {
    const id = current.value?.id;
    selected.value = id ? answers[id] || "" : "";
  },
  { immediate: true }
);

function persistCurrentSelection() {
  const id = current.value?.id;
  if (!id) return;
  if (!selected.value) return;
  answers[id] = selected.value;
}

function next() {
  if (!selected.value) {
    toast.error("請先選擇一個選項");
    return;
  }
  persistCurrentSelection();

  if (isLast.value) {
    if (Object.keys(answers).length < TOTAL) {
      toast.error("尚有未作答的題目");
      return;
    }
    finished.value = true;
    result.value = scoreToRoles(answers);
    return;
  }
  index.value += 1;
}

function prev() {
  if (index.value === 0) return;
  persistCurrentSelection();
  index.value -= 1;
}

function skip() {
  if (isLast.value) {
    toast.info("已在最後一題，請作答或重新測驗");
    return;
  }
  index.value += 1;
}

function restart() {
  for (const k of Object.keys(answers)) delete answers[k];
  index.value = 0;
  finished.value = false;
  result.value = [];
  selected.value = "";
}

// 題庫防呆
if (!Array.isArray(QUESTIONS) || !QUESTIONS.length) {
  toast.error("題庫讀取失敗：請檢查 src/lib/questions.single.js 的輸出");
  router.replace("/");
}
</script>

<style scoped>
/* 淡入淡出動畫 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
