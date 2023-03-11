<script lang="ts" setup>
import  { LocalDate } from '@js-joda/core';
import { computed, onMounted, reactive, ref } from 'vue';
import VsSchedulerTimelineRow from './subcomponents/VsSchedulerTimelineRow.vue';
import type { VsSchedulerEventGroup } from './VsScheduler.vue';

export interface VsSchedulerTimelineProps {
  groups: VsSchedulerEventGroup[];
  cellWidth: number;
}

export interface VsSchedulerTimelineEvents {
  (eventName: "on-scroll", scrollOffsets: {scrollX: number, scrollY: number}): void;
  (eventName: "on-scale", scaleDelta: 1 | 0 | -1): void;
}

const props = defineProps<VsSchedulerTimelineProps>();
const emit = defineEmits<VsSchedulerTimelineEvents>();

const timelineContainer = ref<HTMLDivElement>();

const earliestStartDate = props.groups.flatMap((group) => group.events.map((events) => events)).reduce((earliestStartDate, event) => earliestStartDate.isAfter(event.startDate) ? event.startDate : earliestStartDate, LocalDate.now());

const lastKnownScrollPosition = reactive({
  scrollX: 0,
  scrollY: 0,
})

let scrollYLocked = false;

function onScrollView(event: Event) {
  if (!timelineContainer.value) {
    return 
  }

  lastKnownScrollPosition.scrollX = timelineContainer.value.scrollLeft;
  lastKnownScrollPosition.scrollY = scrollYLocked ? lastKnownScrollPosition.scrollY : timelineContainer.value.scrollTop;

  emit("on-scroll", lastKnownScrollPosition);
}

function onMouseScroll(event: Event | WheelEvent) {
  let scaleDelta: 1 | 0 | -1 = 0;

  if (event instanceof WheelEvent) {
    scrollYLocked = event.ctrlKey;

    // Scrolling down is to scroll out, which is positive Y
    scaleDelta = event.deltaY > 0 ? -1 : 1;
  }

  if (scrollYLocked) {
    event.preventDefault();
    event.stopPropagation();

    emit("on-scale", scaleDelta);
  }
}

onMounted(() => {
  if (timelineContainer.value) {
    lastKnownScrollPosition.scrollX = timelineContainer.value.scrollLeft;
    lastKnownScrollPosition.scrollY = timelineContainer.value.scrollTop;

    timelineContainer.value.addEventListener("mousewheel", (e) => onMouseScroll(e));
    timelineContainer.value.addEventListener("DOMMouseScroll", (e) => onMouseScroll(e));
  }
})
</script>

<template>
  <div ref="timelineContainer" class="vs-scheduler-timeline-container" @scroll="onScrollView">
    <!-- @TODO: Don't use index for key -->
    <vs-scheduler-timeline-row :earliest-start-date="earliestStartDate" v-for="(group, index) in groups" :key="index" :group="group" :cell-width="cellWidth" />
  </div>
</template>

<style>
.vs-scheduler-timeline-container {
  height: 100%;
  width: 100%;
  overflow: auto;
  overflow-x: scroll;

  display: grid;
  grid-auto-rows: var(--vs-scheduler-row-height);
  grid-row-gap: 1px;
}
</style>
