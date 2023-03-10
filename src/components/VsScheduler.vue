<script setup lang="ts">
import VsSchedulerTimeline from './VsSchedulerTimeline.vue';
import VsSchedulerGroups from './VsSchedulerGroups.vue';

export interface VsSchedulerEvent {
  startDate: Date;
  plannedEndDate: Date;
}

export interface VsSchedulerEventGroup {
  name: string;
  events: VsSchedulerEvent[];
}

export interface VsSchedulerProps {
  groups: VsSchedulerEventGroup[];
}

const props = defineProps<VsSchedulerProps>();

</script>

<template>
  <div class="vs-scheduler">
    <vs-scheduler-groups :groups="groups" />
    <vs-scheduler-timeline :groups="groups" />
  </div>
</template>

<style scoped>
.vs-scheduler {
  height: 100%;
  width: 100%;
  outline: 1px solid black;

  display: grid;

  grid-template-rows: auto;
  grid-template-columns: 300px auto;
  grid-template-areas: 
    "groups timeline";

  overflow: auto;
}
</style>