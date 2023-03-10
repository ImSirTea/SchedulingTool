<script lang="ts" setup>
import type { VsSchedulerEventGroup } from './VsScheduler.vue';
import VsSchedulerGroup from "./subcomponents/VsSchedulerGroup.vue"
import VsSchedulerGroupHeader from "./subcomponents/VsSchedulerGroupHeader.vue"

export interface VsSchedulerProps {
  groups: VsSchedulerEventGroup[];
}

const props = defineProps<VsSchedulerProps>();
</script>

<template>
 <div class="vs-scheduler-groups">
    <vs-scheduler-group-header />
    <vs-scheduler-group v-for="(group, index) in groups" :key="index" :group="group" />
 </div>
</template>

<style>
.vs-scheduler-groups {
  grid-area: groups;
}
</style>