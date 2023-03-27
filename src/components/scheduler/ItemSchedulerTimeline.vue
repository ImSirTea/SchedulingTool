<script lang="ts" setup>
import type {
	SchedulerConfiguration,
	SchedulerItem,
	SchedulerRow
} from "@/components/scheduler/types";

export interface ItemSchedulerTimelineProps {
	rows: SchedulerRow[];
	items: SchedulerItem[];
	configuration: SchedulerConfiguration;
	scrollX: number;
	scrollY: number;
}
export interface ItemSchedulerTimelineEvents {
	(eventName: "update:rows", rows: SchedulerRow[]): void;
	(eventName: "update:items", items: SchedulerItem[]): void;
	(eventName: "update:scroll-x", newScrollX: number): void;
	(eventName: "update:scroll-y", newScrollY: number): void;
}

const props = defineProps<ItemSchedulerTimelineProps>();
const emit = defineEmits<ItemSchedulerTimelineEvents>();
</script>

<template>
	<div class="scheduler-timeline">Work in progress! 🛠</div>
</template>

<style>
.scheduler-timeline {
	grid-area: timeline;
}
</style>
