<script setup lang="ts">

export interface VsSchedulerEvent {
  startDate: Date;
  plannedEndDate: Date;
}

export interface VsSchedulerEventGroup {
  name: string;
  events: VsSchedulerEvent[];
}

export interface VsSchedulerProps {
  events: VsSchedulerEventGroup[];
}

const props = defineProps<VsSchedulerProps>();

</script>

<template>
  <div class="vs-scheduler">
    <slot name="groups" />
  </div>
</template>

<style scoped>
.vs-scheduler {
  height: 100%;
  width: 100%;
  outline: 1px solid black;
}
</style>