<script lang="ts" setup>
import type { VsSchedulerEvent } from '../VsScheduler.vue'
import { ChronoUnit, LocalDate } from '@js-joda/core'
import { reactive } from 'vue'

export interface VsSchedulerItemProps {
  event: VsSchedulerEvent
  cellWidth: number
  earliestStartDate: LocalDate
}

export interface VsSchedulerItemEvents {
  (eventName: 'start-date-changed', newStartDate: LocalDate): void
  (eventName: 'end-date-changed', newEndDate: LocalDate): void
  (eventName: 'move-event', newStartDate: LocalDate, newEndDate: LocalDate): void
}

const props = defineProps<VsSchedulerItemProps>()
const emit = defineEmits<VsSchedulerItemEvents>()

const internalEvent = reactive<VsSchedulerEvent>({
  id: props.event.id,
  startDate: props.event.startDate,
  endDate: props.event.endDate
}) as VsSchedulerEvent

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

type DragHandleOrigin = 'start-date' | 'end-date'

let dragHandleOrigin: DragHandleOrigin | null = null
let dragHandleOriginDate: LocalDate | null = null
let dragHandleXOrigin: number | null = null
let dragHandleChangeInDate: number = 0

let dragItemXOrigin: number | null = null
let dragItemChangeInDate: number = 0

function onDragHandleMouseDown(
  event: MouseEvent,
  originDate: LocalDate,
  dragHandlePosition: DragHandleOrigin
) {
  // We are already dragging
  if (
    dragHandleOrigin !== null ||
    dragHandleOriginDate !== null ||
    dragHandleXOrigin !== null ||
    dragItemXOrigin !== null
  ) {
    return
  }

  dragHandleOriginDate = originDate
  dragHandleXOrigin = event.clientX
  dragHandleOrigin = dragHandlePosition

  document.addEventListener('mousemove', onDragHandleMove)
  document.addEventListener('mouseup', onDragHandleMouseUp)
  document.body.classList.add('vs-scheduler-drag-handle-resizing')
}

function onDragHandleMouseUp(event: MouseEvent) {
  if (dragHandleOriginDate && dragHandleChangeInDate) {
    const newDate = dragHandleOriginDate.plusDays(dragHandleChangeInDate)

    if (dragHandleOrigin === 'start-date') {
      emit('start-date-changed', newDate)
    } else {
      emit('end-date-changed', newDate)
    }
  }

  dragHandleOriginDate = null
  dragHandleXOrigin = null
  dragHandleOrigin = null
  dragHandleChangeInDate = 0

  document.removeEventListener('mousemove', onDragHandleMove)
  document.removeEventListener('mouseup', onDragHandleMouseUp)
  document.body.classList.remove('vs-scheduler-drag-handle-resizing')
}

function onDragHandleMove(event: MouseEvent) {
  // We are not dragging
  if (dragHandleOrigin === null || dragHandleOriginDate === null || dragHandleXOrigin === null) {
    return
  }

  const xDelta = event.clientX - dragHandleXOrigin
  const datesDelta = Math.round(xDelta / props.cellWidth)

  if (dragHandleChangeInDate !== datesDelta) {
    dragHandleChangeInDate = datesDelta

    const newDate = dragHandleOriginDate.plusDays(dragHandleChangeInDate)

    if (dragHandleOrigin === 'start-date') {
      internalEvent.startDate = newDate
    } else {
      internalEvent.endDate = newDate
    }
  }
}

function onItemMouseDown(event: MouseEvent) {
  // We aren't dragging an item
  if (
    dragHandleOrigin !== null ||
    dragHandleOriginDate !== null ||
    dragHandleXOrigin !== null ||
    dragItemXOrigin !== null
  ) {
    return
  }

  dragItemXOrigin = event.clientX

  document.addEventListener('mousemove', onItemMouseMove)
  document.addEventListener('mouseup', onItemMouseUp)
  document.body.classList.add('vs-scheduler-timeline-item-dragging')
}

function onItemMouseUp(event: MouseEvent) {
  if (dragItemChangeInDate) {
    emit(
      'move-event',
      props.event.startDate.plusDays(dragItemChangeInDate),
      props.event.endDate.plusDays(dragItemChangeInDate)
    )
  }

  dragItemXOrigin = null
  dragItemChangeInDate = 0

  document.removeEventListener('mousemove', onItemMouseMove)
  document.removeEventListener('mouseup', onItemMouseUp)
  document.body.classList.remove('vs-scheduler-timeline-item-dragging')
}

function onItemMouseMove(event: MouseEvent) {
  // We aren't moving the item
  if (dragItemXOrigin === null) {
    return
  }

  // @TODO: Dupe logic
  const xDelta = event.clientX - dragItemXOrigin
  const datesDelta = Math.round(xDelta / props.cellWidth)

  if (dragItemChangeInDate !== datesDelta) {
    dragItemChangeInDate = datesDelta

    internalEvent.startDate = props.event.startDate.plusDays(dragItemChangeInDate)
    internalEvent.endDate = props.event.endDate.plusDays(dragItemChangeInDate)
  }
}
</script>

<template>
  <div
    class="vs-scheduler-timeline-item"
    :style="{
      width: itemWidth(internalEvent) + 'px',
      height: `calc(100% - ${HEIGHT_OFFSET}px)`,
      transform: `translate(${itemOffsetLeft(internalEvent)}px, ${HEIGHT_OFFSET / 2}px)`
    }"
    @mousedown="($event) => onItemMouseDown($event)"
  >
    <div
      class="vs-scheduler-drag-handle vs-scheduler-drag-handle-left"
      @mousedown="($event) => onDragHandleMouseDown($event, internalEvent.startDate, 'start-date')"
    />
    <div
      class="vs-scheduler-drag-handle vs-scheduler-drag-handle-right"
      @mousedown="($event) => onDragHandleMouseDown($event, internalEvent.endDate, 'end-date')"
    />
  </div>
</template>

<style>
.vs-scheduler-timeline-item {
  height: 100%;
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

.vs-scheduler-timeline-item:hover .vs-scheduler-drag-handle {
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

.vs-scheduler-timeline-item-dragging {
  cursor: grabbing !important;
}

.vs-scheduler-drag-handle-resizing {
  cursor: ew-resize !important;
}

body:not(.vs-scheduler-drag-handle-resizing, .vs-scheduler-timeline-item-dragging)
  .vs-scheduler-timeline-item {
  cursor: grab;
}
</style>
