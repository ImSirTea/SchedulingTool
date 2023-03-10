<script setup lang="ts">
import { ref } from 'vue';
import VsScheduler from './components/VsScheduler.vue';
import type { VsSchedulerEventGroup } from './components/VsScheduler.vue';

const eventGroups = ref<VsSchedulerEventGroup[]>(
  Array(50).fill(0).map((arr, idx) => ({name: `Group ${idx}`, events: []}))
);

</script>

<template>
  <div class="container">
    <vs-scheduler :groups="eventGroups" />
  </div>
</template>

<style scoped>
.container {
  width: 75vw;
  height: 75vh;
}
</style>
