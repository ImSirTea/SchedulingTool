<script lang="ts" setup>
import { computed } from 'vue';
import { type LocalDate, ChronoUnit } from "@js-joda/core";


export interface VsSchedulerCalendarRulerProps {
   startDate: LocalDate;
   endDate: LocalDate;
}

const props = defineProps<VsSchedulerCalendarRulerProps>();

const numberOfDaysBetween = computed(() => ChronoUnit.DAYS.between(props.startDate, props.endDate))
const allDays = computed(() => Array(numberOfDaysBetween.value).fill(0).map((_, idx) => (props.startDate.plusDays(idx))))

</script>

<template>
 <div class="vs-scheduler-calendar-ruler">
    <div v-for="day in allDays" :key="day.toString()" class="vs-scheduler-calendar-date" />
 </div>
</template>

<style>
.vs-scheduler-calendar-ruler {
   display: flex;
}

.vs-scheduler-calendar-date {
   width: 5rem;
   height: 5rem;
}

</style>