<template>
  <svg :viewBox="`0 0 ${size} ${size}`" :width="size" :height="size" class="max-w-full">
    <g :transform="`translate(${c},${c})`">
      <!-- 同心網格 -->
      <g v-for="r in levels" :key="'g'+r">
        <polygon :points="polygonPoints(r/levels)" fill="none" stroke="#94a3b8" stroke-opacity="0.3"/>
      </g>

      <!-- 軸線與標籤 -->
      <g v-for="(a,i) in axes" :key="'a'+i">
        <line :x1="0" :y1="0" :x2="axisX(i,1)" :y2="axisY(i,1)" stroke="#cbd5e1" stroke-width="1"/>
        <text :x="axisX(i,1.12)" :y="axisY(i,1.12)" font-size="10" fill="#475569"
              text-anchor="middle" dominant-baseline="middle">
          {{ a }}
        </text>
      </g>

      <!-- 目標系列（淡紫） -->
      <polygon v-if="values2 && values2.length === axes.length"
               :points="dataPoints(values2)"
               fill="rgba(167,139,250,.20)" stroke="rgba(167,139,250,1)" />

      <!-- 現況系列（天藍） -->
      <polygon v-if="values && values.length === axes.length"
               :points="dataPoints(values)"
               fill="rgba(14,165,233,.25)" stroke="rgba(14,165,233,1)" />
    </g>
  </svg>
</template>

<script setup>
const props = defineProps({
  // 現況數值（0~1），長度需與 axes 相同
  values:  { type: Array,  default: () => [] },
  // 目標數值（0~1，可省略），長度需與 axes 相同
  values2: { type: Array,  default: null },
  // 軸名稱
  axes:    { type: Array,  default: () => [] },
  // 畫布大小
  size:    { type: Number, default: 280 },
  // 網格層數
  levels:  { type: Number, default: 4 },
})

const c = props.size / 2

const axisX = (i, r) =>
  c * r * Math.cos((Math.PI * 2 / props.axes.length) * i - Math.PI / 2)

const axisY = (i, r) =>
  c * r * Math.sin((Math.PI * 2 / props.axes.length) * i - Math.PI / 2)

const polygonPoints = (ratio) =>
  (props.axes.length ? props.axes : [0]).map((_, i) =>
    `${axisX(i, ratio)},${axisY(i, ratio)}`
  ).join(' ')

const dataPoints = (arr) =>
  (arr && arr.length ? arr : [0]).map((v, i) =>
    `${axisX(i, v), axisX(i, v)}`
  ) && arr.map((v, i) => `${axisX(i, v)},${axisY(i, v)}`).join(' ')
</script>
