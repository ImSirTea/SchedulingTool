<script lang="ts" setup>
import type { VsSchedulerEvent } from '../VsScheduler.vue'
import { ChronoUnit, LocalDate } from '@js-joda/core'
import { reactive } from 'vue'

export interface VsSchedulerItemProps {
  event: VsSchedulerEvent
  cellWidth: number
  earliestStartDate: LocalDate
  scrollX: number
}

export interface VsSchedulerItemEvents {
  (eventName: 'start-date-changed', newStartDate: LocalDate): void
  (eventName: 'end-date-changed', newEndDate: LocalDate): void
  (eventName: 'move-event', datesDelta: number): void
}

const props = defineProps<VsSchedulerItemProps>()
const emit = defineEmits<VsSchedulerItemEvents>()

const SPACING_OFFSET = 2
const HEIGHT_OFFSET = 8

function numberOfDaysInItem(event: VsSchedulerEvent): number {
  return ChronoUnit.DAYS.between(event.startDate, event.endDate)
}

function itemWidth(event: VsSchedulerEvent): number {
  return props.cellWidth * numberOfDaysInItem(event) - SPACING_OFFSET - 1 // @TODO: Could use a CSS var to control spacing, -1 for border
}

function daysBetweenOriginAndItemStart(event: VsSchedulerEvent): number {
  return ChronoUnit.DAYS.between(props.earliestStartDate, event.startDate)
}

function itemOffsetLeft(event: VsSchedulerEvent): number {
  return props.cellWidth * daysBetweenOriginAndItemStart(event) + SPACING_OFFSET / 2
}

type ResizeHandleOrigin = 'start-date' | 'end-date'

let resizeHandleOrigin: ResizeHandleOrigin | null = null
let resizeHandleOriginDate: LocalDate | null = null
let resizeHandleXOrigin: number | null = null
let resizeHandleChangeInDate: number = 0
let activeResizeHandle: HTMLDivElement | null = null

let dragItemXOrigin: number | null = null
let dragItemChangeInDate: number = 0

function onResizeHandleMouseDown(
  event: MouseEvent,
  originDate: LocalDate,
  dragHandlePosition: ResizeHandleOrigin
) {
  // We are already dragging
  if (
    resizeHandleOrigin !== null ||
    resizeHandleOriginDate !== null ||
    resizeHandleXOrigin !== null ||
    dragItemXOrigin !== null ||
    activeResizeHandle !== null
  ) {
    return
  }

  resizeHandleOriginDate = originDate
  resizeHandleXOrigin = event.clientX + props.scrollX
  resizeHandleOrigin = dragHandlePosition
  activeResizeHandle = event.target as HTMLDivElement

  window.addEventListener('mousemove', onResizeHandleMove)
  window.addEventListener('mouseup', onResizeHandleMouseUp)
  document.body.classList.add('vs-scheduler-drag-handle-resizing')
  activeResizeHandle.classList.add('vs-scheduler-drag-handle-active')
}

function onResizeHandleMouseUp(event: MouseEvent) {
  if (activeResizeHandle) {
    activeResizeHandle.classList.remove('vs-scheduler-drag-handle-active')
  }

  resizeHandleOriginDate = null
  resizeHandleXOrigin = null
  resizeHandleOrigin = null
  resizeHandleChangeInDate = 0
  activeResizeHandle = null

  window.removeEventListener('mousemove', onResizeHandleMove)
  window.removeEventListener('mouseup', onResizeHandleMouseUp)
  document.body.classList.remove('vs-scheduler-drag-handle-resizing')
}

function onResizeHandleMove(event: MouseEvent) {
  // We are not dragging
  if (
    resizeHandleOrigin === null ||
    resizeHandleOriginDate === null ||
    resizeHandleXOrigin === null ||
    activeResizeHandle === null
  ) {
    return
  }

  // @TODO: Dupe logic
  const xDelta = event.clientX + props.scrollX - resizeHandleXOrigin
  const datesDelta = Math.round(xDelta / props.cellWidth)

  if (resizeHandleChangeInDate !== datesDelta) {
    resizeHandleChangeInDate = datesDelta

    const newDate = resizeHandleOriginDate.plusDays(resizeHandleChangeInDate)

    if (resizeHandleOrigin === 'start-date' && newDate.isBefore(props.event.endDate)) {
      emit('start-date-changed', newDate)
    } else if (resizeHandleOrigin === 'end-date' && newDate.isAfter(props.event.startDate)) {
      emit('end-date-changed', newDate)
    }
  }
}

function onItemMouseDown(event: MouseEvent) {
  // We aren't dragging an item
  if (
    resizeHandleOrigin !== null ||
    resizeHandleOriginDate !== null ||
    resizeHandleXOrigin !== null ||
    dragItemXOrigin !== null
  ) {
    return
  }

  dragItemXOrigin = event.clientX + props.scrollX

  window.addEventListener('mousemove', onItemMouseMove)
  window.addEventListener('mouseup', onItemMouseUp)
  document.body.classList.add('vs-scheduler-timeline-item-dragging')
}

function onItemMouseUp(event: MouseEvent) {
  dragItemXOrigin = null
  dragItemChangeInDate = 0

  window.removeEventListener('mousemove', onItemMouseMove)
  window.removeEventListener('mouseup', onItemMouseUp)
  document.body.classList.remove('vs-scheduler-timeline-item-dragging')
}

function onItemMouseMove(event: MouseEvent) {
  // We aren't moving the item
  if (dragItemXOrigin === null) {
    return
  }

  // @TODO: Dupe logic
  const xDelta = event.clientX + props.scrollX - dragItemXOrigin
  const datesDelta = Math.round(xDelta / props.cellWidth)

  if (dragItemChangeInDate !== datesDelta) {
    emit('move-event', datesDelta - dragItemChangeInDate)
    dragItemChangeInDate = datesDelta
  }
}
</script>

<template>
  <div
    class="vs-scheduler-timeline-item"
    :style="{
      width: itemWidth(event) + 'px',
      height: `calc(100% - ${HEIGHT_OFFSET}px)`,
      transform: `translate(${itemOffsetLeft(event)}px, ${HEIGHT_OFFSET / 2}px)`
    }"
    @mousedown="($event) => onItemMouseDown($event)"
  >
    <div
      class="vs-scheduler-drag-handle vs-scheduler-drag-handle-left"
      @mousedown="($event) => onResizeHandleMouseDown($event, event.startDate, 'start-date')"
    />
    <div
      class="vs-scheduler-drag-handle vs-scheduler-drag-handle-right"
      @mousedown="($event) => onResizeHandleMouseDown($event, event.endDate, 'end-date')"
    />
  </div>
</template>

<style>
.vs-scheduler-timeline-item {
  background-color: lightcoral;
  position: absolute;
  box-shadow: inset 0 0 0 5px rgba(255, 0, 0, 0.5);
}

/* So that when hoving an item, we can still see handles */
.vs-scheduler-timeline-item:hover {
  z-index: 1;
}

/* The one we're currently using should always win */
.vs-scheduler-timeline-item:active {
  z-index: 2;
}

.vs-scheduler-drag-handle {
  position: absolute;
  width: 1em;
  height: 100%;
  background-color: gray;
  display: none;
  cursor: ew-resize;
}

/* Make our resize handle visible if we aren't already resizing, and we are hovering */
body:not(.vs-scheduler-drag-handle-resizing)
  .vs-scheduler-timeline-item:hover
  .vs-scheduler-drag-handle {
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

/* Show grabbed cursor  when resizing */
.vs-scheduler-timeline-item-dragging {
  cursor: grabbing !important;
}

/* Show east/west resize cursor when resizing */
.vs-scheduler-drag-handle-resizing {
  cursor: ew-resize !important;
}

/* Is we aren't dragging or resizing, show the grab */
body:not(.vs-scheduler-drag-handle-resizing, .vs-scheduler-timeline-item-dragging)
  .vs-scheduler-timeline-item {
  cursor: grab;
}

/* Don't show handles on drag  */
body.vs-scheduler-timeline-item-dragging
  .vs-scheduler-timeline-item:hover
  .vs-scheduler-drag-handle {
  display: none;
}

/* Show handle on resize */
.vs-scheduler-drag-handle-active {
  display: block;
}
</style>
