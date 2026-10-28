<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  index: string
  label: string
}>()
</script>

<template>
  <main class="page">
    <div class="shell page__bar">
      <RouterLink to="/" class="page__back mono">← 首页</RouterLink>
      <span class="page__sep" aria-hidden="true"></span>
      <span class="page__crumb mono">{{ label }} · {{ index }}</span>
      <span class="page__rule" aria-hidden="true"></span>
    </div>

    <slot />
  </main>
</template>

<style scoped>
.page {
  padding-top: var(--header-h);
}

.page__bar {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-top: clamp(26px, 3.6vw, 46px);
}

.page__back {
  font-size: 10.5px;
  letter-spacing: 0.18em;
  color: var(--tx-2);
  transition: color 0.2s ease;
}

.page__back:hover {
  color: var(--rm-red);
}

.page__sep {
  width: 1px;
  height: 12px;
  background: var(--line-2);
}

.page__crumb {
  font-size: 10px;
  letter-spacing: 0.2em;
  color: #4a5561;
}

.page__rule {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, var(--line-1), transparent);
}

/* 子页面首屏不再需要整段 128px 的上边距 */
.page :deep(.section) {
  padding-top: clamp(24px, 3.2vw, 40px);
}
</style>
