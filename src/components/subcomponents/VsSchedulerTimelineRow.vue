<script lang="ts" setup>
import type { LocalDate } from '@js-joda/core'
import { computed } from 'vue'
import type { VsSchedulerEventGroup } from '../VsScheduler.vue'
import VsSchedulerEventVue from './VsSchedulerEvent.vue'

export interface VsSchedulerTimelineRowProps {
  group: VsSchedulerEventGroup
  cellWidth: number
  rowWidth: number
  earliestStartDate: LocalDate
  latestEndDate: LocalDate
}

const props = defineProps<VsSchedulerTimelineRowProps>()

const backgroundStripePattern = computed(
  () => `repeating-linear-gradient(
    90deg,
    white,
    white ${props.cellWidth - 1}px,
    black 0,
    black ${props.cellWidth}px
  )`
)
</script>

<template>
  <div
    class="vs-scheduler-timeline-row"
    :style="{ background: backgroundStripePattern, width: `${props.rowWidth}px` }"
  >
    <vs-scheduler-event-vue
      v-for="(event, idx) in group.events"
      :key="idx + event.startDate.toString() + event.endDate.toString()"
      :cell-width="cellWidth"
      :earliest-start-date="earliestStartDate"
      :event="event"
    />
  </div>
</template>
