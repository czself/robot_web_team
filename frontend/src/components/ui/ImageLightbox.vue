<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, watch } from 'vue'

const props = defineProps<{
  items: { src: string; alt: string }[]
  index: number | null
}>()

const emit = defineEmits<{ close: []; move: [delta: number] }>()

const isOpen = computed(() => props.index !== null && props.items.length > 0)
const current = computed(() => (props.index === null ? null : props.items[props.index] ?? null))
const position = computed(() =>
  props.index === null ? '' : `${String(props.index + 1).padStart(2, '0')} / ${String(props.items.length).padStart(2, '0')}`,
)

const onKey = (e: KeyboardEvent) => {
  if (!isOpen.value) return
  if (e.key === 'Escape') emit('close')
  else if (e.key === 'ArrowRight') emit('move', 1)
  else if (e.key === 'ArrowLeft') emit('move', -1)
}

/* 打开时锁住背景滚动，关闭后恢复原值 */
let prevOverflow = ''
watch(isOpen, (open) => {
  if (open) {
    prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = prevOverflow
  }
})

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = prevOverflow
})
</script>

<template>
  <Teleport to="body">
    <Transition name="lb">
      <div v-if="isOpen && current" class="lb" role="dialog" aria-modal="true" @click.self="emit('close')">
        <button class="lb__scrim" type="button" aria-label="关闭" @click="emit('close')"></button>

        <div class="lb__stage">
          <Transition name="lb-img" mode="out-in">
            <img :key="current.src" :src="current.src" :alt="current.alt" class="lb__img" />
          </Transition>
        </div>

        <div class="lb__bar">
          <span class="lb__count mono">{{ position }}</span>
          <span class="lb__sep" aria-hidden="true"></span>
          <span class="lb__cap">{{ current.alt }}</span>
        </div>

        <button class="lb__nav lb__nav--prev cut-a" type="button" aria-label="上一张" @click="emit('move', -1)">
          ←
        </button>
        <button class="lb__nav lb__nav--next cut-a" type="button" aria-label="下一张" @click="emit('move', 1)">
          →
        </button>

        <button class="lb__close" type="button" aria-label="关闭" @click="emit('close')">
          <span></span>
          <span></span>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lb {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(20px, 4vh, 56px) clamp(16px, 8vw, 120px);
}

.lb__scrim {
  position: absolute;
  inset: 0;
  background: rgba(3, 5, 8, 0.93);
  backdrop-filter: blur(14px);
  cursor: zoom-out;
}

.lb__stage {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 0;
  /* 让空白区域的点击穿透到遮罩，实现"点外部关闭" */
  pointer-events: none;
}

.lb__img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.6);
  pointer-events: auto;
  cursor: default;
}

.lb__bar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 22px;
  padding-top: 16px;
  width: min(100%, 720px);
  border-top: 1px solid var(--line-1);
}

.lb__count {
  font-size: 11px;
  letter-spacing: 0.18em;
  color: var(--rm-red);
}

.lb__sep {
  width: 24px;
  height: 1px;
  background: var(--line-2);
}

.lb__cap {
  font-size: 13px;
  color: var(--tx-1);
}

.lb__nav {
  --cut: 12px;
  position: absolute;
  top: 50%;
  z-index: 2;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  color: var(--tx-0);
  background: rgba(9, 13, 19, 0.85);
  box-shadow: inset 0 0 0 1px var(--line-2);
  transition:
    background 0.28s ease,
    box-shadow 0.28s ease,
    color 0.28s ease;
}

.lb__nav:hover {
  background: rgba(255, 51, 51, 0.16);
  box-shadow: inset 0 0 0 1px var(--rm-red);
  color: #fff;
}

.lb__nav--prev {
  left: clamp(6px, 2vw, 28px);
  transform: translateY(-50%);
}

.lb__nav--next {
  right: clamp(6px, 2vw, 28px);
  transform: translateY(-50%);
}

.lb__close {
  position: absolute;
  top: clamp(18px, 3vh, 34px);
  right: clamp(16px, 3vw, 40px);
  z-index: 2;
  width: 42px;
  height: 42px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.lb__close span {
  display: block;
  width: 20px;
  height: 1.5px;
  background: var(--tx-0);
  transition: background 0.25s ease;
}

.lb__close span:first-child {
  transform: rotate(45deg) translateY(3.25px);
}

.lb__close span:last-child {
  transform: rotate(-45deg) translateY(-3.25px);
}

.lb__close:hover span {
  background: var(--rm-red);
}

/* 进出场 */
.lb-enter-active,
.lb-leave-active {
  transition: opacity 0.32s ease;
}

.lb-enter-from,
.lb-leave-to {
  opacity: 0;
}

.lb-enter-active .lb__img {
  transition:
    transform 0.5s var(--ease-out),
    opacity 0.4s ease;
}

.lb-enter-from .lb__img {
  transform: scale(0.965);
  opacity: 0;
}

/* 换图 */
.lb-img-enter-active {
  transition:
    opacity 0.28s ease,
    transform 0.42s var(--ease-out);
}

.lb-img-leave-active {
  transition:
    opacity 0.16s ease,
    transform 0.2s ease;
}

.lb-img-enter-from {
  opacity: 0;
  transform: scale(0.985);
}

.lb-img-leave-to {
  opacity: 0;
  transform: scale(0.995);
}

@media (max-width: 640px) {
  .lb__nav {
    width: 44px;
    height: 44px;
  }

  .lb__bar {
    width: 100%;
  }
}
</style>
