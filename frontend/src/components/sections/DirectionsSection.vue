<script setup lang="ts">
import MechaPanel from '@/components/ui/MechaPanel.vue'
import SectionHead from '@/components/ui/SectionHead.vue'
import { directions } from '@/data/site'
</script>

<template>
  <section id="directions" class="section dir">
    <div class="shell">
      <SectionHead
        index="02"
        en="Five divisions"
        zh="五个组，总有一个适合你"
        desc="不看专业，看你愿意钻多深。每个组都有现役队员带，从最基础的工具链教起。"
      />

      <div class="dir__grid">
        <MechaPanel
          v-for="(d, i) in directions"
          :key="d.index"
          cut="md"
          pad="26px"
          interactive
          v-reveal="i * 70"
        >
          <article class="dir__card">
            <div class="dir__head">
              <span class="dir__index mono">{{ d.index }}</span>
              <span class="dir__en mono">{{ d.en }}</span>
            </div>

            <h3 class="dir__name">{{ d.name }}</h3>
            <p class="dir__desc">{{ d.desc }}</p>

            <ul class="dir__tags">
              <li v-for="t in d.tags" :key="t">{{ t }}</li>
            </ul>
          </article>
        </MechaPanel>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 3 + 2 错位：前三个各占 1/3，后两个各占 1/2 */
.dir__grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 14px;
}

.dir__grid > :nth-child(-n + 3) {
  grid-column: span 2;
}

.dir__grid > :nth-child(n + 4) {
  grid-column: span 3;
}

.dir__card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.dir__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 24px;
}

.dir__index {
  font-size: 12px;
  color: var(--rm-red);
}

.dir__en {
  font-size: 9px;
  letter-spacing: 0.16em;
  color: var(--tx-2);
  text-align: right;
}

.dir__name {
  font-size: 22px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--tx-0);
}

.dir__desc {
  margin-top: 12px;
  font-size: 13.5px;
  line-height: 1.8;
  color: var(--tx-1);
  flex: 1;
}

.dir__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid var(--line-1);
}

.dir__tags li {
  font-size: 11.5px;
  color: var(--tx-2);
  padding: 3px 9px;
  background: var(--rm-blue-soft);
  box-shadow: inset 0 0 0 1px rgba(51, 153, 204, 0.16);
}

@media (max-width: 1024px) {
  .dir__grid > :nth-child(n) {
    grid-column: span 3;
  }
}

@media (max-width: 680px) {
  .dir__grid > :nth-child(n) {
    grid-column: span 6;
  }
}
</style>
