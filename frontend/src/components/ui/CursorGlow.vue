<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

/* 全站跟随光标的一团冷光，位置带惯性，用来给静态页面一点"呼吸" */
const glow = ref<HTMLElement>()

let frame = 0
let curX = 0
let curY = 0
let aimX = 0
let aimY = 0
let bound = false

const tick = () => {
  curX += (aimX - curX) * 0.14
  curY += (aimY - curY) * 0.14
  const el = glow.value
  if (el) el.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, 0)`

  if (Math.abs(aimX - curX) > 0.4 || Math.abs(aimY - curY) > 0.4) {
    frame = requestAnimationFrame(tick)
  } else {
    frame = 0
  }
}

const onMove = (e: PointerEvent) => {
  aimX = e.clientX
  aimY = e.clientY
  if (!bound) {
    bound = true
    curX = aimX
    curY = aimY
    glow.value?.classList.add('is-on')
  }
  if (!frame) frame = requestAnimationFrame(tick)
}

const onLeave = (e: PointerEvent) => {
  if (e.relatedTarget === null) glow.value?.classList.remove('is-on')
}

onMounted(() => {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!fine || calm) return

  window.addEventListener('pointermove', onMove, { passive: true })
  document.addEventListener('pointerout', onLeave)
})

onUnmounted(() => {
  window.removeEventListener('pointermove', onMove)
  document.removeEventListener('pointerout', onLeave)
  if (frame) cancelAnimationFrame(frame)
})
</script>

<template>
  <div ref="glow" class="glow" aria-hidden="true"></div>
</template>

<style scoped>
.glow {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 5;
  width: 460px;
  height: 460px;
  margin: -230px 0 0 -230px;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.55s ease;
  will-change: transform;
  background: radial-gradient(
    circle,
    rgba(92, 191, 234, 0.13) 0%,
    rgba(51, 153, 204, 0.07) 34%,
    rgba(51, 153, 204, 0) 66%
  );
}

.glow.is-on {
  opacity: 1;
}

/* 触屏和弱动效设备上直接不渲染 */
@media (hover: none), (pointer: coarse) {
  .glow {
    display: none;
  }
}
</style>
