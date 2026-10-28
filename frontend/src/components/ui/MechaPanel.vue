<script setup lang="ts">
import type { CSSProperties } from 'vue'

const props = withDefaults(
  defineProps<{
    cut?: 'sm' | 'md' | 'lg'
    tone?: 'steel' | 'red' | 'blue'
    pad?: string
    interactive?: boolean
  }>(),
  { cut: 'md', tone: 'steel', pad: '24px', interactive: false },
)

const cutVar = (cut: string) => ({ '--cut': `var(--cut-${cut})` }) as CSSProperties
</script>

<template>
  <div
    class="mp cut-a tilt"
    :class="[`mp--${tone}`, { 'mp--hover': props.interactive }]"
    :style="{ ...cutVar(cut), padding: pad }"
    v-tilt="props.interactive ? 5 : false"
  >
    <slot />
  </div>
</template>

<style scoped>
.mp {
  position: relative;
  /* 底色与高光分开写：hover 只换底色，光斑层保留 */
  background-color: var(--ink-1);
  background-image: radial-gradient(
    280px circle at var(--mx, 50%) var(--my, 50%),
    rgba(92, 191, 234, 0.08),
    transparent 72%
  );
  box-shadow: inset 0 0 0 1px var(--line-1);
  transition:
    box-shadow 0.35s ease,
    background-color 0.35s ease,
    transform 0.6s var(--ease-out);
}

/* 指针在面板上时缩短 transform 过渡，倾斜才跟手；离开时用上面的长过渡缓缓落位 */
.mp.is-tilting {
  transition-duration: 0.35s, 0.35s, 0.14s;
  transition-timing-function: ease, ease, linear;
}

.mp--hover:hover {
  --lift: -3px;
  background-color: var(--ink-2);
  box-shadow: inset 0 0 0 1px var(--line-3);
}

.mp--red {
  box-shadow: inset 0 0 0 1px rgba(255, 51, 51, 0.3);
}

.mp--red.mp--hover:hover {
  box-shadow: inset 0 0 0 1px var(--rm-red);
}

.mp--blue {
  box-shadow: inset 0 0 0 1px rgba(51, 153, 204, 0.3);
}

.mp--blue.mp--hover:hover {
  box-shadow: inset 0 0 0 1px var(--rm-blue);
}
</style>
