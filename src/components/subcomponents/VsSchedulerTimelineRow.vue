<script lang="ts" setup>
import { ChronoUnit, type LocalDate } from '@js-joda/core'
import { computed } from 'vue'
import type { VsSchedulerEvent, VsSchedulerEventGroup } from '../VsScheduler.vue'
import VsSchedulerItem from './VsSchedulerItem.vue'

export interface VsSchedulerTimelineRowProps {
  group: VsSchedulerEventGroup
  cellWidth: number
  rowWidth: number
  earliestStartDate: LocalDate
  latestEndDate: LocalDate
  scrollX: number
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

  const allEventsBefore = props.group.events.filter((event) => {
    if (event.id === eventToUpdate.id) {
      return false
    }

    return (
      event.startDate.isBefore(newStartDate) ||
      datesIntersect({
        event1Start: event.startDate,
        event1End: event.endDate,
        event2Start: newStartDate,
        event2End: eventToUpdate.endDate
      })
    )
  })

  const changeInDays = ChronoUnit.DAYS.between(eventToUpdate.startDate, newStartDate)

  if (newStartDate.isAfter(eventToUpdate.startDate)) {
    allEventsBefore.map((event) => {
      event.startDate = event.startDate.plusDays(changeInDays)
      event.endDate = event.endDate.plusDays(changeInDays)
    })
  } else {
    const intersectingEvents = props.group.events.filter((event) => {
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

    if (intersectingEvents.length) {
      allEventsBefore.map((event) => {
        event.startDate = event.startDate.plusDays(changeInDays)
        event.endDate = event.endDate.plusDays(changeInDays)
      })
    }
  }

  eventToUpdate.startDate = newStartDate
}

function onEndDateChange(eventToUpdate: VsSchedulerEvent, newEndDate: LocalDate) {
  // End dates need to be after
  if (!newEndDate.isAfter(eventToUpdate.startDate)) {
    return
  }

  const allEventsAfter = props.group.events.filter((event) => {
    if (event.id === eventToUpdate.id) {
      return false
    }

    return (
      event.endDate.isAfter(newEndDate) ||
      datesIntersect({
        event1Start: event.startDate,
        event1End: event.endDate,
        event2Start: eventToUpdate.startDate,
        event2End: newEndDate
      })
    )
  })

  const changeInDays = ChronoUnit.DAYS.between(eventToUpdate.endDate, newEndDate)

  if (newEndDate.isBefore(eventToUpdate.endDate)) {
    allEventsAfter.map((event) => {
      event.startDate = event.startDate.plusDays(changeInDays)
      event.endDate = event.endDate.plusDays(changeInDays)
    })
  } else {
    const intersectingEvents = props.group.events.filter((event) => {
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

    if (intersectingEvents.length) {
      allEventsAfter.map((event) => {
        event.startDate = event.startDate.plusDays(changeInDays)
        event.endDate = event.endDate.plusDays(changeInDays)
      })
    }
  }

  eventToUpdate.endDate = newEndDate
}

function onMoveEvent(datesDelta: number) {
  props.group.events.forEach((event) => {
    event.startDate = event.startDate.plusDays(datesDelta)
    event.endDate = event.endDate.plusDays(datesDelta)
  })
}
</script>

<template>
  <div
    class="vs-scheduler-timeline-row"
    :style="{ background: backgroundStripePattern, width: `${props.rowWidth}px` }"
  >
    <vs-scheduler-item
      v-for="event in group.events"
      :key="event.id"
      :cell-width="cellWidth"
      :earliest-start-date="earliestStartDate"
      :event="event"
      :scroll-x="scrollX"
      @start-date-changed="(newStartDate) => onStartDateChange(event, newStartDate)"
      @end-date-changed="(newEndDate) => onEndDateChange(event, newEndDate)"
      @move-event="(datesDelta) => onMoveEvent(datesDelta)"
    />
  </div>
</template>
