<script setup lang="ts">
import { ref } from 'vue';
import VsScheduler from './components/VsScheduler.vue';
import type { VsSchedulerEventGroup } from './components/VsScheduler.vue';
import { LocalDate } from '@js-joda/core';

const eventGroups = ref<VsSchedulerEventGroup[]>(
  Array(50)
    .fill(0)
    .map((arr, idx): VsSchedulerEventGroup => 
      (
        {
          name: `Group ${idx}`, 
          events: 
          [
            {
              startDate: LocalDate.now().plusDays(idx), 
              endDate: LocalDate.now().plusDays(idx + (Math.max(1, Math.round(Math.random() * 10))))
            }   
          ]
        }
      ) 
    )
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
