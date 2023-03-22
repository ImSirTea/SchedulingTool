<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { type LocalDate, ChronoUnit } from '@js-joda/core'

export interface VsSchedulerCalendarRulerProps {
  startDate: LocalDate
  endDate: LocalDate
  scrollX: number
  cellWidth: number
}

const props = defineProps<VsSchedulerCalendarRulerProps>()
const rulerContainer = ref<HTMLDivElement>()

const numberOfDaysBetween = computed(() => ChronoUnit.DAYS.between(props.startDate, props.endDate))
const allDays = computed(() =>
  Array(numberOfDaysBetween.value)
    .fill(0)
    .map((_, idx) => props.startDate.plusDays(idx).dayOfMonth())
)

const allMonths = computed(() => {
  const months: { name: string; numberOfVisibleDays: number; year: string }[] = []

  let currentMonth: string = ''
  let currentYear: string = ''
  let numberOfVisibleDays = 0

  for (let i = 0; i <= numberOfDaysBetween.value; i++) {
    const workingDate = props.startDate.plusDays(i)
    const wokringMonth = workingDate.month().toString()
    const workingYear = workingDate.year().toString()

    if (wokringMonth !== currentMonth) {
      if (currentMonth !== '') {
        months.push({ name: currentMonth, numberOfVisibleDays, year: currentYear })
      }
      currentMonth = wokringMonth
      currentYear = workingYear
      numberOfVisibleDays = 0
    }

    numberOfVisibleDays += 1
  }

  if (numberOfVisibleDays > 0) {
    months.push({ name: currentMonth, numberOfVisibleDays, year: currentYear })
  }

  return months
})

watch(
  () => props.scrollX,
  () => {
    if (rulerContainer.value) {
      rulerContainer.value.scrollLeft = props.scrollX
    }
  }
)
</script>

<template>
  <div ref="rulerContainer" class="vs-scheduler-calendar-ruler">
    <div class="vs-scheduler-calendar-months-container">
      <div
        v-for="month in allMonths"
        :key="month.toString()"
        class="vs-scheduler-calendar-month"
        :style="{ width: cellWidth * month.numberOfVisibleDays + 'px' }"
      >
        {{ month.name }} {{ month.year }}
      </div>
    </div>
    <div class="vs-scheduler-calendar-days-container">
      <div
        v-for="day in allDays"
        :key="day.toString()"
        class="vs-scheduler-calendar-day"
        :style="{ width: cellWidth + 'px' }"
      >
        {{ day }}
      </div>
    </div>
  </div>
</template>

<style>
.vs-scheduler-calendar-ruler {
  grid-area: calendar;
  display: flex;
  flex-direction: column;

  position: sticky;
  top: 0;
  z-index: 1;

  background-color: white;
  overflow: hidden;
  margin-left: 300px; /* @TODO Fix this */
  border-left: solid 1px black;
  border-top: solid 1px black;
  border-right: 1px solid black;
}

.vs-scheduler-calendar-months-container {
  display: flex;
  flex-direction: row;
}

.vs-scheduler-calendar-days-container {
  display: flex;
  flex-direction: row;
}

.vs-scheduler-calendar-day {
  height: calc(var(--vs-scheduler-row-height) / 2);
  border-bottom: 1px solid black;
  border-right: 1px solid black;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.vs-scheduler-calendar-month {
  height: calc(var(--vs-scheduler-row-height) / 2);
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  flex-shrink: 0;
}
</style>
