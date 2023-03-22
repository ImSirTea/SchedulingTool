<script lang="ts" setup>
import type { LocalDate } from '@js-joda/core'
import { computed } from 'vue'
import type { VsSchedulerEvent, VsSchedulerEventGroup } from '../VsScheduler.vue'
import VsSchedulerItem from './VsSchedulerItem.vue'

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

function datesIntersect(dates: {
  event1Start: LocalDate
  event1End: LocalDate
  event2Start: LocalDate
  event2End: LocalDate
}): boolean {
  return dates.event2Start.isBefore(dates.event1End) && dates.event2End.isAfter(dates.event1Start)
}

function onStartDateChange(eventToUpdate: VsSchedulerEvent, newStartDate: LocalDate) {
  // Start dates need to be before
  if (!newStartDate.isBefore(eventToUpdate.endDate)) {
    return
  }

  const intersectsAnotherEvent = props.group.events.filter((event) => {
    if (event.id === eventToUpdate.id) {
      return false
    }

    return datesIntersect({
      event1Start: event.startDate,
      event1End: event.endDate,
      event2Start: newStartDate,
      event2End: eventToUpdate.endDate
    })
  })

  console.log(intersectsAnotherEvent)

  eventToUpdate.startDate = newStartDate
}

function onEndDateChange(eventToUpdate: VsSchedulerEvent, newEndDate: LocalDate) {
  // End dates need to be after
  if (!newEndDate.isAfter(eventToUpdate.startDate)) {
    return
  }

  const intersectsAnotherEvent = props.group.events.filter((event) => {
    if (event.id === eventToUpdate.id) {
      return false
    }

    return datesIntersect({
      event1Start: event.startDate,
      event1End: event.endDate,
      event2Start: eventToUpdate.startDate,
      event2End: newEndDate
    })
  })

  console.log(intersectsAnotherEvent)

  eventToUpdate.endDate = newEndDate
}

function onMoveEvent(
  eventToUpdate: VsSchedulerEvent,
  newStartDate: LocalDate,
  newEndDate: LocalDate
) {
  const intersectsAnotherEvent = props.group.events.filter((event) => {
    if (event.id === eventToUpdate.id) {
      return false
    }

    return datesIntersect({
      event1Start: event.startDate,
      event1End: event.endDate,
      event2Start: newStartDate,
      event2End: newEndDate
    })
  })

  console.log(intersectsAnotherEvent)

  eventToUpdate.startDate = newStartDate
  eventToUpdate.endDate = newEndDate
}
</script>

<template>
  <div
    class="vs-scheduler-timeline-row"
    :style="{ background: backgroundStripePattern, width: `${props.rowWidth}px` }"
  >
    <vs-scheduler-item
      v-for="(event, idx) in group.events"
      :key="idx + event.startDate.toString() + event.endDate.toString()"
      :cell-width="cellWidth"
      :earliest-start-date="earliestStartDate"
      :event="event"
      @start-date-changed="(newStartDate) => onStartDateChange(event, newStartDate)"
      @end-date-changed="(newEndDate) => onEndDateChange(event, newEndDate)"
      @move-event="(newStartDate, newEndDate) => onMoveEvent(event, newStartDate, newEndDate)"
    />
  </div>
</template>
