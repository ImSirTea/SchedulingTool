<script lang="ts" setup>
import type { VsSchedulerEvent } from '../VsScheduler.vue'
import { ChronoUnit, LocalDate } from '@js-joda/core'

export interface VsSchedulerEventProps {
  event: VsSchedulerEvent
  cellWidth: number
  earliestStartDate: LocalDate
}

const props = defineProps<VsSchedulerEventProps>()

const SPACING_OFFSET = 2
const HEIGHT_OFFSET = 8

function numberOfDaysInEvent(event: VsSchedulerEvent): number {
  return ChronoUnit.DAYS.between(event.startDate, event.endDate)
}

function eventWidth(event: VsSchedulerEvent): number {
  return props.cellWidth * numberOfDaysInEvent(event) - SPACING_OFFSET - 1 // @TODO: Could use a CSS var to control spacing, -1 for border
}

function daysBetweenOriginAndEventStart(event: VsSchedulerEvent): number {
  return ChronoUnit.DAYS.between(props.earliestStartDate, event.startDate)
}

function eventOffsetLeft(event: VsSchedulerEvent): number {
  return props.cellWidth * daysBetweenOriginAndEventStart(event) + SPACING_OFFSET / 2
}

let dragOriginDate: LocalDate | null = null

function onDragHandleMouseDown(event: MouseEvent, originDate: LocalDate) {
  dragOriginDate = originDate
}

function onDragHandleMouseUp(event: MouseEvent, originDate: LocalDate) {
  dragOriginDate = null
}

function onDragHandleMove(event: MouseEvent) {
  if (dragOriginDate === null) {
    return
  }
}
</script>

<template>
  <div
    class="vs-scheduler-timeline-event"
    :style="{
      width: eventWidth(event) + 'px',
      height: `calc(100% - ${HEIGHT_OFFSET}px)`,
      transform: `translate(${eventOffsetLeft(event)}px, ${HEIGHT_OFFSET / 2}px)`
    }"
  >
    <div
      class="vs-scheduler-drag-handle vs-scheduler-drag-handle-left"
      @mousedown="($event) => onDragHandleMouseDown($event, event.startDate)"
    />
    <div
      class="vs-scheduler-drag-handle vs-scheduler-drag-handle-right"
      @mousedown="($event) => onDragHandleMouseUp($event, event.endDate)"
    />
  </div>
</template>

<style>
.vs-scheduler-timeline-event {
  height: 100%;
  background-color: lightcoral;
  position: absolute;
}

.vs-scheduler-drag-handle {
  position: absolute;
  width: 1em;
  height: 100%;
  background-color: gray;
  display: none;
  cursor: grab;
}

.vs-scheduler-drag-handle:active {
  cursor: grabbing;
}

.vs-scheduler-timeline-event:hover .vs-scheduler-drag-handle {
  display: block;
  top: 0;
  bottom: 0;
}

.vs-scheduler-drag-handle-left {
  left: 0;
}

.vs-scheduler-drag-handle-right {
  right: 0;
}
</style>
