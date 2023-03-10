<script lang="ts" setup>
import type { VsSchedulerEventGroup } from '../VsScheduler.vue';

export interface VsSchedulerEventGroupProps {
  group: VsSchedulerEventGroup;
}

const props = defineProps<VsSchedulerEventGroupProps>();
</script>

<template>
  <div class="vs-scheduler-group">
    {{  group.name }}
  </div>
</template>

<style>
</style>
