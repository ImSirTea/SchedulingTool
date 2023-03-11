<script lang="ts" setup>
import { ChronoUnit, LocalDate } from '@js-joda/core';
import { computed } from 'vue';
import type { VsSchedulerEventGroup } from '../VsScheduler.vue';

export interface VsSchedulerTimelineRowProps {
  group: VsSchedulerEventGroup;
  cellWidth: number;
  earliestStartDate: LocalDate;
}

const props = defineProps<VsSchedulerTimelineRowProps>();

const itemStartDate = computed(() => props.group.events.map((event) => event.startDate).reduce((itemStartDate, event) => itemStartDate.isBefore(event) ? itemStartDate : event));
const itemEndDate = computed(() => props.group.events.map((event) => event.endDate).reduce((itemEndDate, event) => itemEndDate.isAfter(event) ? itemEndDate : event));

const numberOfDaysInEvents = computed(() => ChronoUnit.DAYS.between(itemStartDate.value, itemEndDate.value));
const itemWidth = computed(() => props.cellWidth * numberOfDaysInEvents.value);

const daysBetweenOriginAndItemStart = computed(() => ChronoUnit.DAYS.between(props.earliestStartDate, itemStartDate.value));
const offsetLeft = computed(() => props.cellWidth * daysBetweenOriginAndItemStart.value);

const backgroundStripePattern = computed(() => `repeating-linear-gradient(
    90deg,
    white,
    white ${props.cellWidth - 1}px,
    black 0,
    black ${props.cellWidth}px
  )`)
</script>

<template>
 <div class="vs-scheduler-timeline-row" :style="{background: backgroundStripePattern}">
    <div class="vs-scheduler-timeline-item" :style="{width: itemWidth + 'px', 'margin-left': offsetLeft + 'px'}" />
 </div>
</template>

<style>
.vs-scheduler-timeline-row {
  background-color: white;
  padding: 5px 0;
}

.vs-scheduler-timeline-item {
  height: 100%;
  background-color: lightcoral;

}
</style>
