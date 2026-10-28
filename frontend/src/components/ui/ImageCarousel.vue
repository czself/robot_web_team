<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    images: string[]
    alt: string
    /** 悬停时自动轮播的间隔（ms），传 0 关闭 */
    interval?: number
  }>(),
  { interval: 3200 },
)

const index = ref(0)
const total = props.images.length

const go = (i: number) => {
  index.value = (i + total) % total
}

const step = (d: number) => go(index.value + d)

/* 悬停自动轮播：进入开始、离开停在当前张，不覆盖用户手动选择的结果 */
let timer = 0

const stop = () => {
  if (!timer) return
  clearInterval(timer)
  timer = 0
}

const start = () => {
  if (timer || props.interval <= 0 || total < 2) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = window.setInterval(() => step(1), props.interval)
}

/* 手动操作后重新计时
   否则「悬停到一半点了下一张」会在零点几秒后被计时器再推一张，像连跳两格。
   本来没在自动播（interval=0、触屏、减少动效）就不该借这次操作把它启动起来 */
const restart = () => {
  if (!timer) return
  stop()
  start()
}

const userStep = (d: number) => {
  step(d)
  restart()
}

const userGo = (i: number) => {
  go(i)
  restart()
}

/* 触屏轻扫：只有横向位移明显大于纵向时才翻页，避免抢走页面滚动 */
let sx = 0
let sy = 0

const onDown = (e: PointerEvent) => {
  sx = e.clientX
  sy = e.clientY
}

const onUp = (e: PointerEvent) => {
  const dx = e.clientX - sx
  const dy = e.clientY - sy
  if (Math.abs(dx) < 44 || Math.abs(dx) < Math.abs(dy)) return
  userStep(dx < 0 ? 1 : -1)
}

/* 其余图在首屏稳定后预取，切换时不会出现空白帧 */
let prefetchTimer = 0

const onMountedPrefetch = () => {
  prefetchTimer = window.setTimeout(() => {
    props.images.slice(1).forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, 1600)
}

onMounted(onMountedPrefetch)

onBeforeUnmount(() => {
  stop()
  clearTimeout(prefetchTimer)
})
</script>

<template>
  <div
    class="cr"
    @pointerenter="start"
    @pointerleave="stop"
    @pointerdown="onDown"
    @pointerup="onUp"
  >
    <div
      class="cr__track"
      :style="{ transform: `translate3d(-${index * 100}%, 0, 0)` }"
      v-parallax="{ speed: -0.02, clamp: 9 }"
    >
      <div v-for="(src, i) in images" :key="src" class="cr__slide">
        <img
          v-img-fade
          :src="src"
          :alt="`${alt} 视图 ${i + 1}`"
          loading="lazy"
          draggable="false"
        />
      </div>
    </div>

    <template v-if="total > 1">
      <button class="cr__arrow cr__arrow--prev" aria-label="上一张" @click.stop="userStep(-1)">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
          <path d="M9.2 2.6 4.4 7.5l4.8 4.9" stroke="currentColor" stroke-width="1.4" />
        </svg>
      </button>
      <button class="cr__arrow cr__arrow--next" aria-label="下一张" @click.stop="userStep(1)">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
          <path d="M5.8 2.6 10.6 7.5l-4.8 4.9" stroke="currentColor" stroke-width="1.4" />
        </svg>
      </button>

      <div class="cr__dots">
        <button
          v-for="(_, i) in images"
          :key="i"
          class="cr__dot"
          :class="{ 'is-on': i === index }"
          :aria-label="`第 ${i + 1} 张`"
          :aria-current="i === index"
          @click.stop="userGo(i)"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
.cr {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* 横向手势留给轮播，纵向仍交给页面滚动 */
  touch-action: pan-y;
}

.cr__track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.62s var(--ease-out);
  will-change: transform;
}

.cr__slide {
  flex: 0 0 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.cr__slide img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  /* 图片是透明底的产品渲染图，contain 才不会切到机身 */
  transition:
    transform 0.9s var(--ease-out),
    filter 0.5s ease,
    opacity 0.72s ease;
}

.cr:hover .cr__slide img {
  transform: scale(1.04);
  filter: brightness(1.06);
}

.cr__arrow {
  position: absolute;
  top: 50%;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  margin-top: -17px;
  color: var(--tx-1);
  background: rgba(5, 7, 10, 0.74);
  backdrop-filter: blur(4px);
  clip-path: polygon(
    7px 0,
    100% 0,
    100% calc(100% - 7px),
    calc(100% - 7px) 100%,
    0 100%,
    0 7px
  );
  cursor: pointer;
  opacity: 0;
  transform: scale(0.94);
  pointer-events: none;
  transition:
    opacity 0.3s ease,
    transform 0.42s var(--ease-out),
    color 0.24s ease,
    background 0.24s ease;
}

.cr__arrow--prev {
  left: 12px;
}

.cr__arrow--next {
  right: 12px;
}

.cr:hover .cr__arrow,
.cr__arrow:focus-visible {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}

.cr__arrow:hover {
  color: #fff;
  background: var(--rm-red);
}

.cr__dots {
  position: absolute;
  left: 16px;
  bottom: 11px;
  z-index: 3;
  display: flex;
  gap: 4px;
}

.cr__dot {
  width: 10px;
  height: 13px;
  padding: 5px 0;
  background: rgba(241, 245, 250, 0.3);
  background-clip: content-box;
  cursor: pointer;
  transition:
    width 0.42s var(--ease-out),
    background-color 0.3s ease;
}

.cr__dot.is-on {
  width: 22px;
  background-color: var(--rm-red);
}

/* 触屏没有 hover，箭头常显，否则无从发现这是轮播 */
@media (hover: none) {
  .cr__arrow {
    opacity: 1;
    transform: none;
    pointer-events: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cr__track {
    transition: none;
  }
}
</style>
