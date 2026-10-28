<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = withDefaults(
  defineProps<{
    href?: string
    to?: string
    variant?: 'red' | 'blue' | 'ghost'
    size?: 'md' | 'lg'
    external?: boolean
    type?: 'button' | 'submit'
    disabled?: boolean
  }>(),
  { variant: 'red', size: 'md', external: false, type: 'button', disabled: false },
)

const tag = computed(() => (props.to ? RouterLink : props.href ? 'a' : 'button'))
</script>

<template>
  <component
    :is="tag"
    :href="href"
    :to="to"
    :type="href || to ? undefined : type"
    :disabled="href || to ? undefined : disabled"
    class="mb cut-btn magnetic"
    :class="[`mb--${variant}`, `mb--${size}`, { 'mb--disabled': disabled }]"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener' : undefined"
    draggable="false"
    v-magnetic="7"
  >
    <span class="mb__label"><slot /></span>
    <span class="mb__slash" aria-hidden="true"></span>
  </component>
</template>

<style scoped>
.mb {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0 26px;
  height: 48px;
  font-family: var(--font-display);
  font-size: 13.5px;
  letter-spacing: 0.04em;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  --mgt-x: 0px;
  --mgt-y: 0px;
  --lift: 0px;
  transform: translate3d(var(--mgt-x), calc(var(--mgt-y) + var(--lift)), 0);
  transition:
    color 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.4s var(--ease-out);
}

/* 磁吸期间缩短过渡，让位移跟手 */
.mb.is-magnetic {
  transition-duration: 0.25s, 0.25s, 0.25s, 0.16s;
}

.mb:hover {
  --lift: -1px;
}

/* 按下时下沉，给出手感反馈 */
.mb:active {
  --lift: 1px;
}

.mb--lg {
  height: 56px;
  padding: 0 34px;
  font-size: 15px;
}

.mb--red {
  background: var(--rm-red);
  color: #fff;
}

.mb--red:hover {
  background: #ff4747;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.3);
}

.mb--blue {
  background: var(--rm-blue-soft);
  color: var(--rm-blue-bright);
  box-shadow: inset 0 0 0 1px rgba(51, 153, 204, 0.45);
}

.mb--blue:hover {
  background: rgba(51, 153, 204, 0.24);
  color: #fff;
}

.mb--ghost {
  color: var(--tx-0);
  box-shadow: inset 0 0 0 1px var(--line-3);
}

.mb--ghost:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.04);
  box-shadow: inset 0 0 0 1px var(--rm-blue);
}

.mb--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.mb--disabled:hover,
.mb--disabled:active {
  --lift: 0px;
}

.mb__label {
  position: relative;
  z-index: 1;
}

.mb__slash {
  position: absolute;
  top: -20%;
  right: 22px;
  width: 1px;
  height: 140%;
  background: currentColor;
  opacity: 0.35;
  transform: rotate(18deg);
  transition:
    transform 0.55s var(--ease-out),
    opacity 0.3s ease;
}

.mb:hover .mb__slash {
  transform: rotate(18deg) translate3d(7px, 0, 0);
  opacity: 0.6;
}

.mb--red .mb__slash {
  background: #fff;
  opacity: 0.5;
}
</style>
