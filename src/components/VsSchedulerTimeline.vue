<script lang="ts" setup>
import  { LocalDate } from '@js-joda/core';
import VsSchedulerCalendarRuler from './subcomponents/VsSchedulerCalendarRuler.vue';



</script>

<template>
  <div class="vs-scheduler-timeline-container">
    <vs-scheduler-calendar-ruler :start-date="LocalDate.now()" :end-date="LocalDate.now().plusDays(50)" />
  </div>
</template>

<style>
.vs-scheduler-timeline-container {
  grid-area: timeline;
}
</style>
