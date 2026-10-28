<script setup lang="ts">
import PageShell from '@/components/layout/PageShell.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import DirectionsSection from '@/components/sections/DirectionsSection.vue'
</script>

<template>
  <PageShell index="01" label="ABOUT">
    <AboutSection />
    <DirectionsSection />
  </PageShell>
</template>
