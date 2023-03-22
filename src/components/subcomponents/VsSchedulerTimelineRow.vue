<script lang="ts" setup>
import { ChronoUnit, LocalDate } from '@js-joda/core'
import { computed } from 'vue'
import type { VsSchedulerEventGroup, VsSchedulerEvent } from '../VsScheduler.vue'

export interface VsSchedulerTimelineRowProps {
  group: VsSchedulerEventGroup
  cellWidth: number
  earliestStartDate: LocalDate
}

const SPACING_OFFSET = 4
const HEIGHT_OFFSET = 8

const props = defineProps<VsSchedulerTimelineRowProps>()

function numberOfDaysInEvent(event: VsSchedulerEvent): number {
  return ChronoUnit.DAYS.between(event.startDate, event.endDate)
}

function eventWidth(event: VsSchedulerEvent): number {
  return props.cellWidth * numberOfDaysInEvent(event) - SPACING_OFFSET - 1 // @TODO: Could use a CSS var to control spacing
}

function daysBetweenOriginAndEventStart(event: VsSchedulerEvent): number {
  return ChronoUnit.DAYS.between(props.earliestStartDate, event.startDate)
}

function eventOffsetLeft(event: VsSchedulerEvent): number {
  return props.cellWidth * daysBetweenOriginAndEventStart(event) + SPACING_OFFSET / 2
}

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
  <div class="vs-scheduler-timeline-row" :style="{ background: backgroundStripePattern }">
    <div
      v-for="(event, idx) in group.events"
      class="vs-scheduler-timeline-item"
      :style="{
        width: eventWidth(event) + 'px',
        height: `calc(100% - ${HEIGHT_OFFSET}px)`,
        transform: `translate(${eventOffsetLeft(event)}px, ${HEIGHT_OFFSET / 2}px)`
      }"
      :key="idx + event.startDate.toString() + event.endDate.toString()"
    />
  </div>
</template>

<style>
.vs-scheduler-timeline-item {
  height: 100%;
  background-color: lightcoral;
  position: absolute;
}
</style>
