<script setup lang="ts">
import VsSchedulerTimeline from './VsSchedulerTimeline.vue';
import VsSchedulerGroups from './VsSchedulerGroups.vue';
import VsSchedulerCalendarRuler from './subcomponents/VsSchedulerCalendarRuler.vue';
import { LocalDate } from '@js-joda/core';
import { computed, reactive, ref } from 'vue';

export interface VsSchedulerEvent {
  startDate: LocalDate;
  endDate: LocalDate;
}

export interface VsSchedulerEventGroup {
  name: string;
  events: VsSchedulerEvent[];
}

export interface VsSchedulerProps {
  groups: VsSchedulerEventGroup[];
}

export interface VsSchedulerCellConfiguration {
  scale: number;
  baseWidth: number;
}

const props = defineProps<VsSchedulerProps>();

const scrollOffset = reactive({
  scrollX: 0,
  scrollY: 0,
})

const scale = ref<number>(1);
const baseWidth = ref<number>(50);
const cellWidth = computed(() => scale.value * baseWidth.value);

function onTimelineScroll(scrollEvent: {scrollX: number, scrollY: number}) {
  scrollOffset.scrollX = scrollEvent.scrollX;
  scrollOffset.scrollY = scrollEvent.scrollY;
}

const allStartDates = computed(() => props.groups.flatMap((group) => group.events.flatMap((event) => event.startDate)));
const allEndDates = computed(() => props.groups.flatMap((group) => group.events.flatMap((event) => event.endDate)));

const earliestStartDate = computed(() => allStartDates.value.reduce((earliestDate, currDate) => earliestDate.isBefore(currDate) ? earliestDate : currDate));
const lastestEndDate = computed(() => allEndDates.value.reduce((lastestDate, currDate) => lastestDate.isAfter(currDate) ? lastestDate : currDate));

</script>

<template>
  <vs-scheduler-calendar-ruler :start-date="earliestStartDate" :end-date="lastestEndDate" :scroll-x="scrollOffset.scrollX" :cell-width="cellWidth" />
  <div class="vs-scheduler">
    <vs-scheduler-groups :groups="groups" :scroll-y="scrollOffset.scrollY" />
    <vs-scheduler-timeline :groups="groups" @on-scroll="onTimelineScroll" :cell-width="cellWidth" />
  </div>
</template>

<style scoped>
.vs-scheduler {
  height: 100%;
  width: 100%;
  outline: 1px solid black;
  overflow: hidden;
  display: grid;
  background-color: black;

  grid-template-columns: 300px auto;
  grid-template-rows: auto auto;
  grid-template-areas: 
    /* "calendar calendar" */
    "groups timeline";

  grid-column-gap: 1px;

}
</style>