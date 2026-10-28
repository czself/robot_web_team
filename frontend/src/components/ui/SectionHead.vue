<script setup lang="ts">
defineProps<{
  index: string
  en: string
  zh: string
  desc?: string
}>()
</script>

<template>
  <header class="sh" v-reveal>
    <div class="sh__meta">
      <span class="sh__index">{{ index }}</span>
      <span class="split-rule" aria-hidden="true"></span>
      <span class="sh__en">{{ en }}</span>
    </div>
    <h2 class="sh__zh">{{ zh }}</h2>
    <p v-if="desc" class="sh__desc">{{ desc }}</p>
  </header>
</template>

<style scoped>
.sh {
  max-width: 760px;
  margin-bottom: clamp(36px, 4vw, 56px);
}

.sh__meta {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
}

.sh__index {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.1em;
  color: var(--rm-red);
}

.sh__en {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--tx-2);
}

.sh__zh {
  font-size: clamp(28px, 3.6vw, 46px);
  font-weight: 500;
  line-height: 1.18;
  letter-spacing: -0.01em;
  color: var(--tx-0);
}

.sh__desc {
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.8;
  color: var(--tx-1);
}
</style>
