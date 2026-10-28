<script setup lang="ts">
import SectionHead from '@/components/ui/SectionHead.vue'
import { pages, team } from '@/data/site'
</script>

<template>
  <section class="section dc">
    <div class="shell">
      <SectionHead
        index="00"
        en="Directory"
        zh="从这里开始"
        desc="首页只保留简介，具体内容分在各自页面里。挑一个你先想知道的。"
      />

      <p class="dc__lead" v-reveal>{{ team.intro }}</p>

      <div class="dc__grid">
        <RouterLink
          v-for="(p, i) in pages"
          :key="p.to"
          v-reveal="i * 60"
          :to="p.to"
          class="dc__card cut-a tilt"
          :class="{ 'dc__card--accent': p.to === '/join' }"
          v-tilt="4"
        >
          <span class="dc__head">
            <span class="dc__index mono">{{ p.index }}</span>
            <span class="dc__en mono">{{ p.en }}</span>
          </span>
          <h3 class="dc__zh">{{ p.zh }}</h3>
          <p class="dc__desc">{{ p.desc }}</p>
          <span class="dc__go mono">进入<i aria-hidden="true">→</i></span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dc__lead {
  max-width: 760px;
  margin-bottom: clamp(34px, 4vw, 52px);
  font-size: 15px;
  line-height: 1.9;
  color: var(--tx-1);
}

.dc__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.dc__card {
  --cut: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 210px;
  padding: 24px 24px 22px;
  background-color: var(--ink-1);
  background-image: radial-gradient(
    280px circle at var(--mx, 50%) var(--my, 50%),
    rgba(92, 191, 234, 0.09),
    transparent 72%
  );
  box-shadow: inset 0 0 0 1px var(--line-1);
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.55s var(--ease-out);
}

.dc__card.is-tilting {
  transition-duration: 0.3s, 0.3s, 0.14s;
  transition-timing-function: ease, ease, linear;
}

.dc__card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 24px;
  bottom: 24px;
  width: 2px;
  background: var(--rm-red);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.42s var(--ease-out);
}

/* 一道很淡的高光斜扫，只在 hover 时划过一次 */
.dc__card::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    102deg,
    transparent 36%,
    rgba(255, 255, 255, 0.065) 50%,
    transparent 64%
  );
  transform: translate3d(-130%, 0, 0);
  transition: transform 0.95s var(--ease-out);
}

.dc__card:hover::after {
  transform: translate3d(130%, 0, 0);
}

.dc__card:hover {
  --lift: -3px;
  background-color: var(--ink-2);
  box-shadow: inset 0 0 0 1px var(--line-3);
}

.dc__card:hover::before {
  transform: scaleY(1);
}

/* 共 5 张卡片，最后一张招新卡横向拉宽，恰好补满第二行，不留空位 */
.dc__card--accent {
  grid-column: span 2;
  background-image:
    radial-gradient(
      280px circle at var(--mx, 50%) var(--my, 50%),
      rgba(255, 51, 51, 0.1),
      transparent 72%
    ),
    linear-gradient(180deg, rgba(255, 51, 51, 0.07), transparent 62%);
}

.dc__head {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.dc__index {
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--rm-red);
}

.dc__en {
  font-size: 9.5px;
  letter-spacing: 0.22em;
  color: var(--tx-2);
}

.dc__zh {
  margin-top: 22px;
  font-size: 21px;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: var(--tx-0);
}

.dc__desc {
  margin-top: 10px;
  font-size: 13px;
  line-height: 1.75;
  color: var(--tx-1);
}

.dc__go {
  margin-top: auto;
  padding-top: 22px;
  font-size: 10px;
  letter-spacing: 0.2em;
  color: var(--tx-2);
  transition: color 0.3s ease;
}

.dc__go i {
  display: inline-block;
  font-style: normal;
  margin-left: 6px;
  transition: transform 0.45s var(--ease-out);
}

.dc__card:hover .dc__go {
  color: var(--rm-red);
}

.dc__card:hover .dc__go i {
  transform: translateX(4px);
}

@media (max-width: 1024px) {
  .dc__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .dc__grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .dc__card {
    min-height: 0;
  }
  .dc__card--accent {
    grid-column: span 1;
  }
}
</style>
