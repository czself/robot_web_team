<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import MechaButton from '@/components/ui/MechaButton.vue'
import { stats, team } from '@/data/site'

/* 首屏滚动：文字随下滚缓慢上移并淡出，图版保持不动，拉开前后层 */
const root = ref<HTMLElement>()
let frame = 0

const update = () => {
  frame = 0
  const el = root.value
  if (!el) return

  const vh = window.innerHeight || 1
  const y = Math.min(window.scrollY, vh)

  el.style.setProperty('--shift', `${(y * 0.16).toFixed(1)}px`)
  el.style.setProperty('--fade', Math.max(0, 1 - y / (vh * 0.72)).toFixed(3))
}

const onScroll = () => {
  if (!frame) frame = requestAnimationFrame(update)
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  if (frame) cancelAnimationFrame(frame)
})
</script>

<template>
  <section id="top" class="hero" ref="root">
    <div class="hero__media" aria-hidden="true">
      <img
        src="/hero-bg.jpg"
        alt=""
        decoding="async"
        fetchpriority="high"
        v-parallax="{ speed: 0.07, clamp: 62 }"
      />
    </div>
    <div class="hero__edge" aria-hidden="true"></div>

    <div class="hero__inner shell">
      <div class="hero__copy">
        <p class="eyebrow hero__in" style="--d: 80ms">{{ team.schoolEn }} · RMUL 2026</p>

        <h1 class="hero__title">
          <span class="hero__line">
            <span class="hero__line-in" style="--d: 180ms">稳定 · 敏捷</span>
          </span>
          <span class="hero__line hero__line--red">
            <span class="hero__line-in" style="--d: 300ms">尽在掌控<i>.</i></span>
          </span>
        </h1>

        <p class="hero__en mono hero__in" style="--d: 520ms">Stable. Responsive. In Control.</p>

        <p class="hero__desc hero__in" style="--d: 600ms">
          豫章师范学院 <strong>YZ Control</strong> 战队。2026 赛季出战 RoboMaster
          机甲大师高校联盟赛，3V3 对抗赛与步兵对抗赛四线出击，四个项目全部获奖。
        </p>

        <div class="hero__actions hero__in" style="--d: 700ms">
          <MechaButton to="/join" variant="red" size="lg">报名加入</MechaButton>
          <MechaButton to="/history" variant="ghost" size="lg">查看队史</MechaButton>
        </div>

        <div class="hero__status hero__in" style="--d: 800ms">
          <span class="hero__dot" aria-hidden="true"></span>
          <span class="hero__status-text">2026 赛季招新开启</span>
          <span class="hero__status-div" aria-hidden="true"></span>
          <RouterLink to="/join" class="hero__status-link">填写报名表</RouterLink>
        </div>
      </div>
    </div>

    <div class="hero__stats">
      <div class="shell hero__stats-inner">
        <div v-for="s in stats" :key="s.label" class="hero__stat">
          <span class="hero__stat-num">
            <span v-count="s.to" class="hero__stat-v">{{ s.value }}</span>
            <i v-if="s.unit">{{ s.unit }}</i>
          </span>
          <span class="hero__stat-label">{{ s.label }}</span>
          <span class="hero__stat-en mono">{{ s.en }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  padding-top: var(--header-h);
  overflow: hidden;
}

/* 图版铺满整个首屏
   从顶栏下沿开始，避免图形钻到透明顶栏背后；
   左半边靠渐变压暗，既能透出签名墙的肌理，又不影响标题可读 */
.hero__media {
  position: absolute;
  top: var(--header-h);
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;
}

.hero__media img {
  /* 上下留出视差余量：向上多出 80px + 向右下多出 36px，
     滚动时 img 会在这段余量里移动，边缘永远不会被裁出空白 */
  display: block;
  height: calc(100% + 116px);
  margin-top: -80px;
  width: 100%;
  object-fit: cover;
  /* 宽幅图全铺后按中心裁切，主体「理想握在手中」正好落在视口中段 */
  object-position: 50% 50%;
  filter: grayscale(0.45) contrast(1.08) brightness(0.72);
  /* 极缓慢推近，定格在 1，避免长期循环带来的廉价感 */
  animation: drift-zoom 3.4s var(--ease-out) both;
}

/* 左暗右亮：斜线所在处正好是明暗过渡带，分界和红线重合 */
.hero__media::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    95deg,
    rgba(5, 7, 10, 0.92) 0%,
    rgba(5, 7, 10, 0.86) 26%,
    rgba(5, 7, 10, 0.56) 46%,
    rgba(5, 7, 10, 0.1) 62%,
    rgba(5, 7, 10, 0.34) 100%
  );
}

/* 斜边上的红蓝双色描线
   红段是底色，蓝段是独立的一层，两层各自纯色、在 top 处硬衔接，
   不经过任何渐变插值，所以交界不会有缝；
   分界按视口中线定位（并限制在区块一半以内），保证首屏看上去对半分 */
.hero__edge {
  --split: min(calc(50vh - var(--header-h)), 50%);
  position: absolute;
  top: var(--header-h);
  right: 0;
  bottom: 0;
  width: 56%;
  z-index: 1;
  pointer-events: none;
  clip-path: polygon(20% 0, calc(20% + 2px) 0, 2px 100%, 0 100%);
  background: var(--rm-red);
  transform-origin: top;
  animation: line-grow 1.25s var(--ease-out) 0.2s both;
}

.hero__edge::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: calc(var(--split) - 1px);
  bottom: -4px;
  background: var(--rm-blue);
}

.hero__inner {
  position: relative;
  z-index: 2;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  padding-top: clamp(32px, 5vh, 64px);
  padding-bottom: clamp(32px, 5vh, 64px);
  transform: translate3d(0, calc(var(--shift, 0px) * -1), 0);
  opacity: var(--fade, 1);
  will-change: transform, opacity;
}

.hero__copy {
  max-width: 680px;
}

/* 首屏入场：逐级上浮，靠 --d 控制节奏 */
.hero__in {
  animation: fade-up 1.05s var(--ease-reveal) both;
  animation-delay: var(--d, 0ms);
}

.hero__title {
  display: flex;
  flex-direction: column;
  margin-top: 26px;
  font-size: clamp(44px, 7.4vw, 96px);
  font-weight: 500;
  line-height: 1.04;
  letter-spacing: 0.04em;
}

/* 每行单独遮罩，从下方整行升起 */
.hero__line {
  display: block;
  overflow: hidden;
  padding-bottom: 0.09em;
  margin-bottom: -0.09em;
}

.hero__line-in {
  display: block;
  animation: rise 1.1s var(--ease-out) both;
  animation-delay: var(--d, 0ms);
}

.hero__line--red {
  color: var(--rm-red);
}

.hero__line--red i {
  font-style: normal;
  color: var(--rm-blue);
}

.hero__en {
  margin-top: 20px;
  font-size: 11px;
  letter-spacing: 0.3em;
  color: var(--tx-2);
}

.hero__desc {
  max-width: 520px;
  margin-top: 24px;
  font-size: 15.5px;
  line-height: 1.85;
  color: var(--tx-1);
}

.hero__desc strong {
  font-weight: 500;
  color: var(--tx-0);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 34px;
}

.hero__status {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 24px;
  padding: 7px 14px 7px 12px;
  background: rgba(9, 13, 19, 0.7);
  box-shadow: inset 0 0 0 1px var(--line-1);
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%);
}

.hero__dot {
  width: 6px;
  height: 6px;
  background: var(--rm-red);
  box-shadow: 0 0 0 0 rgba(255, 51, 51, 0.5);
  animation: beat 2.6s infinite;
}

@keyframes beat {
  0% { box-shadow: 0 0 0 0 rgba(255, 51, 51, 0.5); }
  70% { box-shadow: 0 0 0 7px rgba(255, 51, 51, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 51, 51, 0); }
}

.hero__status-text {
  font-size: 12.5px;
  color: var(--tx-1);
}

.hero__status-div {
  width: 1px;
  height: 12px;
  background: var(--line-2);
}

.hero__status-link {
  font-size: 12.5px;
  color: var(--rm-blue-bright);
}

.hero__status-link:hover {
  color: #fff;
}

.hero__stats {
  position: relative;
  z-index: 2;
  border-top: 1px solid var(--line-1);
  background: rgba(9, 13, 19, 0.72);
  backdrop-filter: blur(10px);
  animation: fade-in 1.1s ease 1s both;
}

.hero__stats-inner {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.hero__stat {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 20px 0 22px clamp(16px, 2.4vw, 32px);
}

.hero__stat + .hero__stat::before {
  content: '';
  position: absolute;
  left: 0;
  top: 20px;
  bottom: 22px;
  width: 1px;
  background: var(--line-1);
}

.hero__stat-num {
  font-family: var(--font-mono);
  font-size: clamp(22px, 2.4vw, 30px);
  line-height: 1.1;
  color: var(--tx-0);
}

.hero__stat-v {
  font-variant-numeric: tabular-nums;
}

.hero__stat-num i {
  font-style: normal;
  font-size: 0.42em;
  margin-left: 3px;
  color: var(--rm-blue);
}

.hero__stat-label {
  font-size: 12.5px;
  color: var(--tx-1);
}

.hero__stat-en {
  font-size: 9px;
  letter-spacing: 0.2em;
  color: var(--tx-2);
}

@media (max-width: 1100px) {
  /* 窄屏下把明暗过渡带往右挪，给文字留出更多可读空间 */
  .hero__media::after {
    background: linear-gradient(
      95deg,
      rgba(5, 7, 10, 0.94) 0%,
      rgba(5, 7, 10, 0.9) 34%,
      rgba(5, 7, 10, 0.6) 56%,
      rgba(5, 7, 10, 0.14) 74%,
      rgba(5, 7, 10, 0.36) 100%
    );
  }
}

@media (max-width: 820px) {
  .hero {
    min-height: auto;
    padding-bottom: 0;
  }
  .hero__media {
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    bottom: auto;
    width: 100%;
    height: 300px;
    clip-path: none;
    order: -1;
  }
  /* 移动端图条本身就是横带，视差幅度减半，余量也相应缩小 */
  .hero__media img {
    height: calc(100% + 80px);
    margin-top: -40px;
  }
  .hero__media::after {
    background: linear-gradient(180deg, rgba(5, 7, 10, 0.15) 0%, var(--ink-0) 94%);
  }
  .hero__edge {
    display: none;
  }
  .hero__inner {
    display: block;
  }
  .hero__stats-inner {
    grid-template-columns: repeat(2, 1fr);
  }
  .hero__stat:nth-child(odd)::before {
    display: none;
  }
  .hero__stat:nth-child(-n + 2) {
    border-bottom: 1px solid var(--line-1);
  }
  .hero__actions :deep(.mb) {
    flex: 1;
    justify-content: center;
  }
  .hero__eyebrow {
    font-size: 9.5px;
    letter-spacing: 0.14em;
  }
  .hero__eyebrow::before {
    width: 14px;
  }
}
</style>
