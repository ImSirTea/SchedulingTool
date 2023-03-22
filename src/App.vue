<script setup lang="ts">
import { ref } from 'vue'
import VsScheduler from './components/VsScheduler.vue'
import type { VsSchedulerEventGroup, VsSchedulerEvent } from './components/VsScheduler.vue'
import { LocalDate } from '@js-joda/core'

function buildEvents(number: number, startDate: LocalDate): VsSchedulerEvent[] {
  const events: VsSchedulerEvent[] = []

  let workingStartDate = startDate

  for (let i = 0; i < number; i++) {
    const endDate = workingStartDate.plusDays(Math.max(1, Math.round(Math.random() * 10)))

    events.push({
      startDate: workingStartDate,
      endDate
    })

    workingStartDate = endDate
  }

  return events
}

const eventGroups = ref<VsSchedulerEventGroup[]>(
  Array(50)
    .fill(0)
    .map(
      (arr, idx): VsSchedulerEventGroup => ({
        name: `Group ${idx}`,
        events: buildEvents(3, LocalDate.now().plusDays(idx))
      })
    )
)
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
