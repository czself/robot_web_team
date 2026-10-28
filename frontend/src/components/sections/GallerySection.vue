<script setup lang="ts">
import { ref } from 'vue'
import SectionHead from '@/components/ui/SectionHead.vue'
import ImageLightbox from '@/components/ui/ImageLightbox.vue'
import { gallery } from '@/data/site'

const active = ref<number | null>(null)

/* 每格给一点不同的视差速度，滚动时整片网格像有厚度的层叠面，
   而不是一块平板整体位移。数值刻意压得很小（±15px 封顶） */
const speeds = [0.016, 0.024, 0.019, 0.028]
const speedOf = (i: number) => speeds[i % speeds.length]

const open = (i: number) => {
  active.value = i
}

const close = () => {
  active.value = null
}

const move = (delta: number) => {
  if (active.value === null) return
  active.value = (active.value + delta + gallery.length) % gallery.length
}
</script>

<template>
  <section id="gallery" class="section ga">
    <div class="shell">
      <SectionHead index="05" en="On the field" zh="赛场与实验室" desc="从调试到上场，这些是我们真实的样子。" />

      <div class="ga__grid">
        <button
          v-for="(g, i) in gallery"
          :key="g.src"
          type="button"
          class="ga__item cut-a"
          :class="`ga__item--${g.span}`"
          v-reveal="{ delay: (i % 4) * 60, dir: 'zoom' }"
          :aria-label="`放大查看：${g.alt}`"
          @click="open(i)"
        >
          <img
            v-img-fade
            v-parallax="{ speed: speedOf(i), clamp: 15 }"
            :src="g.src"
            :alt="g.alt"
            loading="lazy"
          />
          <span class="ga__cap mono">{{ g.alt }}</span>
          <span class="ga__zoom" aria-hidden="true"></span>
        </button>
      </div>
    </div>

    <ImageLightbox :items="gallery" :index="active" @close="close" @move="move" />
  </section>
</template>

<style scoped>
.ga__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-rows: 198px;
  grid-auto-flow: dense;
  gap: 10px;
}

.ga__item {
  --cut: 12px;
  position: relative;
  display: block;
  padding: 0;
  width: 100%;
  overflow: hidden;
  background-color: var(--ink-1);
  margin: 0;
  cursor: zoom-in;
}

.ga__item--wide {
  grid-column: span 2;
}

.ga__item--tall {
  grid-row: span 2;
}

.ga__item img {
  /* 视差余量：比框高 32px、上下各留 16px，滚动时画面只在这段余量里移动，
     边缘不会露出底色 */
  display: block;
  width: 100%;
  height: calc(100% + 32px);
  margin-top: -16px;
  object-fit: cover;
  filter: grayscale(0.15) brightness(0.86);
  transition:
    transform 0.95s var(--ease-out),
    filter 0.55s ease;
}

.ga__item::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 54%, rgba(5, 7, 10, 0.85) 100%);
  opacity: 0.65;
  transition: opacity 0.4s ease;
}

.ga__item:hover img {
  transform: scale(1.05);
  filter: grayscale(0) brightness(1);
}

.ga__item:hover::after {
  opacity: 1;
}

.ga__cap {
  position: absolute;
  left: 14px;
  bottom: 12px;
  z-index: 1;
  font-size: 9.5px;
  letter-spacing: 0.16em;
  color: rgba(241, 245, 250, 0.85);
  opacity: 0;
  transform: translateY(6px);
  transition:
    opacity 0.45s ease,
    transform 0.55s var(--ease-out);
}

/* 右上角放大提示：hover 才浮出来 */
.ga__zoom {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
  width: 22px;
  height: 22px;
  background: rgba(5, 7, 10, 0.72);
  box-shadow: inset 0 0 0 1px var(--line-2);
  clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px);
  opacity: 0;
  transform: translateY(-5px);
  transition:
    opacity 0.32s ease,
    transform 0.45s var(--ease-out);
}

.ga__zoom::before,
.ga__zoom::after {
  content: '';
  position: absolute;
  background: var(--tx-1);
}

.ga__zoom::before {
  left: 50%;
  top: 6px;
  bottom: 6px;
  width: 1px;
  transform: translateX(-50%);
}

.ga__zoom::after {
  top: 50%;
  left: 6px;
  right: 6px;
  height: 1px;
  transform: translateY(-50%);
}

.ga__item:hover .ga__zoom {
  opacity: 1;
  transform: none;
}

.ga__item:focus-visible {
  outline: none;
  box-shadow: inset 0 0 0 2px var(--rm-red);
}

.ga__item:hover .ga__cap {
  opacity: 1;
  transform: none;
}

@media (max-width: 1024px) {
  .ga__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-auto-rows: 170px;
  }
}

@media (max-width: 680px) {
  .ga__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: 140px;
  }
  .ga__item--tall {
    grid-row: span 1;
  }
}
</style>
