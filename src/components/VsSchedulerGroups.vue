<script lang="ts" setup>
import type { VsSchedulerEventGroup } from './VsScheduler.vue';
import VsSchedulerGroup from "./subcomponents/VsSchedulerGroup.vue"
import { ref, watch } from 'vue';

export interface VsSchedulerProps {
  groups: VsSchedulerEventGroup[];
  scrollY: number;
}

const props = defineProps<VsSchedulerProps>();
const groupContainer = ref<HTMLDivElement>();

watch(() => props.scrollY, () => {
  if (groupContainer.value) {
    groupContainer.value.scrollTop = props.scrollY;
  }
})
</script>

<template>
 <div ref="groupContainer" class="vs-scheduler-groups">
    <!-- @TODO: Don't use index for key -->
    <vs-scheduler-group v-for="(group, index) in groups" :key="index" :group="group" />
 </div>
</template>

<style>
.vs-scheduler-groups {
  grid-area: groups;
  overflow-y: hidden;
  overflow-x: scroll;

  display: grid;
  grid-auto-rows: var(--vs-scheduler-row-height);
  grid-row-gap: 1px;
}
</style>