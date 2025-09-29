<template>
  <!-- 放射漸層 -->
  <div class="pointer-events-none absolute inset-0 -z-10 bg-radial"></div>

  <!-- 漸層氣泡（兩顆，緩慢飄動） -->
  <div class="pointer-events-none absolute -z-10 left-[8%] top-[-60px] h-[360px] w-[360px] rounded-full
              bg-gradient-to-tr from-primary/25 to-accent/25 blur-3xl animate-float"></div>
  <div class="pointer-events-none absolute -z-10 right-[10%] top-[40vh] h-[300px] w-[300px] rounded-full
              bg-gradient-to-tr from-accent/25 to-primary/25 blur-3xl animate-float"
       style="animation-delay: -2.2s"></div>

  <!-- 柔和噪點（提升質感） -->
  <div class="pointer-events-none absolute inset-0 -z-10 opacity-[.06]" :style="noiseStyle"></div>
</template>

<script setup>
const svgNoise = encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'>
  <filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2'/></filter>
  <rect width='100%' height='100%' filter='url(#n)' opacity='.8'/>
</svg>`);
const noiseStyle = `background-image: url("data:image/svg+xml,${svgNoise}")`
</script>
