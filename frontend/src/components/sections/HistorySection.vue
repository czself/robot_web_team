<script setup lang="ts">
import SectionHead from '@/components/ui/SectionHead.vue'
import { history, honors } from '@/data/site'
</script>

<template>
  <section id="history" class="section hs">
    <div class="shell">
      <SectionHead
        index="04"
        en="History"
        zh="从建队，到领奖台"
        desc="2025 年 11 月建队，2026 年 5 月第一次站上赛场。两年里发生过的事，都在这条线上。"
      />

      <div class="hs__line">
        <div v-for="y in history" :key="y.year" class="hs__year">
          <div class="hs__year-col" v-reveal>
            <span class="hs__year-num">{{ y.year }}</span>
            <span class="hs__year-en mono">{{ y.en }}</span>
            <p class="hs__year-sum">{{ y.summary }}</p>
          </div>

          <div class="hs__track reveal--bare" v-reveal>
            <div
              v-for="(e, i) in y.events"
              :key="e.date"
              class="hs__ev"
              v-reveal="i * 90"
            >
              <span class="hs__node" aria-hidden="true"></span>
              <span class="hs__date mono">{{ e.date }}</span>

              <article class="hs__card cut-a tilt" v-tilt="3">
                <header class="hs__head">
                  <h3 class="hs__title">{{ e.title }}</h3>
                  <span v-if="e.state === 'open'" class="hs__state mono">进行中</span>
                </header>

                <p class="hs__desc">{{ e.desc }}</p>

                <ul v-if="e.tags?.length" class="hs__tags">
                  <li v-for="t in e.tags" :key="t">{{ t }}</li>
                </ul>

                <ul v-if="e.awards" class="hs__awards">
                  <li v-for="a in honors" :key="a.code" class="hs__aw">
                    <span class="hs__aw-media">
                      <img
                        v-img-fade
                        :src="a.image"
                        :alt="`${a.group} ${a.level} 证书`"
                        loading="lazy"
                      />
                    </span>
                    <span class="hs__aw-txt">
                      <span class="hs__aw-level">{{ a.level }}</span>
                      <span class="hs__aw-group">{{ a.group }}</span>
                      <span class="hs__aw-code mono">{{ a.code }}</span>
                    </span>
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hs__line {
  display: flex;
  flex-direction: column;
  gap: clamp(30px, 3.8vw, 54px);
}

.hs__year {
  display: grid;
  grid-template-columns: minmax(132px, 176px) minmax(0, 1fr);
  gap: clamp(20px, 3vw, 48px);
}

.hs__year + .hs__year {
  padding-top: clamp(26px, 3.4vw, 44px);
  border-top: 1px solid var(--line-1);
}

/* 年份列：滚动时跟随，让读者始终知道处在哪一年 */
.hs__year-col {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-self: start;
  padding-top: 2px;
}

@media (min-width: 861px) {
  .hs__year-col {
    position: sticky;
    top: calc(var(--header-h) + 30px);
  }
}

.hs__year-num {
  font-family: var(--font-display);
  font-size: clamp(34px, 4.2vw, 54px);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--tx-0);
}

.hs__year-en {
  font-size: 9.5px;
  letter-spacing: 0.22em;
  color: var(--rm-blue);
}

.hs__year-sum {
  margin-top: 4px;
  font-size: 13px;
  line-height: 1.75;
  color: var(--tx-2);
  max-width: 168px;
}

/* 轨道：一条竖线 + 每事件一个菱形节点 */
.hs__track {
  position: relative;
  padding-left: 42px;
}

.hs__track::before {
  content: '';
  position: absolute;
  left: 4px;
  top: 6px;
  bottom: 6px;
  width: 1px;
  background: linear-gradient(180deg, var(--line-3), var(--line-1) 62%, rgba(255, 255, 255, 0.02));
  /* 进入视口时自上而下"画"出来 */
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 1.2s var(--ease-out) 0.1s;
}

.hs__track.is-in::before {
  transform: scaleY(1);
}

.hs__ev {
  position: relative;
  padding-bottom: clamp(22px, 2.6vw, 34px);
}

.hs__ev:last-child {
  padding-bottom: 0;
}

.hs__node {
  position: absolute;
  left: -42px;
  top: 6px;
  width: 9px;
  height: 9px;
  background: var(--ink-0);
  box-shadow: inset 0 0 0 1px var(--rm-red);
  transform: rotate(45deg);
}

.hs__ev:last-child .hs__node {
  background: var(--rm-red);
  box-shadow:
    inset 0 0 0 1px var(--rm-red),
    0 0 0 4px rgba(255, 51, 51, 0.12);
}

.hs__date {
  display: block;
  margin-bottom: 10px;
  font-size: 11px;
  letter-spacing: 0.16em;
  color: var(--rm-red);
}

.hs__card {
  --cut: 12px;
  padding: clamp(18px, 2.2vw, 26px) clamp(20px, 2.4vw, 28px);
  background-color: var(--ink-1);
  background-image: radial-gradient(
    320px circle at var(--mx, 50%) var(--my, 50%),
    rgba(92, 191, 234, 0.06),
    transparent 72%
  );
  box-shadow: inset 0 0 0 1px var(--line-1);
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.6s var(--ease-out);
}

.hs__card.is-tilting {
  transition-duration: 0.3s, 0.3s, 0.14s;
  transition-timing-function: ease, ease, linear;
}

.hs__card:hover {
  --lift: -2px;
  background-color: var(--ink-2);
  box-shadow: inset 0 0 0 1px var(--line-3);
}

.hs__head {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.hs__title {
  font-size: clamp(16px, 1.5vw, 19px);
  font-weight: 500;
  letter-spacing: 0.01em;
  color: var(--tx-0);
}

.hs__state {
  padding: 3px 9px 3px 8px;
  font-size: 9.5px;
  letter-spacing: 0.12em;
  color: #fff;
  background: var(--rm-red);
  clip-path: polygon(0 0, 100% 0, calc(100% - 7px) 100%, 0 100%);
}

.hs__desc {
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.85;
  color: var(--tx-1);
  max-width: 660px;
}

.hs__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.hs__tags li {
  position: relative;
  padding: 3px 10px 3px 9px;
  font-size: 11.5px;
  color: var(--tx-2);
  background: rgba(255, 255, 255, 0.03);
  box-shadow: inset 0 0 0 1px var(--line-1);
  clip-path: polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px);
}

/* 赛季奖项：节点内展开，小图 + 文字横排 */
.hs__awards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 14px 20px;
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid var(--line-1);
}

.hs__aw {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.hs__aw-media {
  flex: 0 0 52px;
  aspect-ratio: 1 / 1.414;
  overflow: hidden;
  background: #f2f2f2;
}

.hs__aw-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.9);
  transition:
    filter 0.35s ease,
    transform 0.6s var(--ease-out);
}

.hs__aw:hover .hs__aw-media img {
  filter: brightness(1);
  transform: scale(1.04);
}

.hs__aw-txt {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.hs__aw-level {
  font-size: 12px;
  color: var(--rm-red);
}

.hs__aw-group {
  font-size: 13px;
  line-height: 1.5;
  color: var(--tx-0);
}

.hs__aw-code {
  font-size: 9px;
  letter-spacing: 0.12em;
  color: var(--tx-2);
}

@media (max-width: 860px) {
  .hs__year {
    grid-template-columns: minmax(0, 1fr);
    gap: 18px;
  }

  .hs__year-col {
    flex-direction: row;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 10px 14px;
  }

  .hs__year-sum {
    flex: 1 1 100%;
    max-width: none;
    margin-top: 0;
  }

  .hs__track {
    padding-left: 30px;
  }

  .hs__node {
    left: -30px;
  }
}

@media (max-width: 560px) {
  .hs__date {
    font-size: 10px;
  }

  .hs__awards {
    grid-template-columns: minmax(0, 1fr);
    gap: 14px;
  }
}
</style>
