<script lang="ts" setup>
import type {
	ItemSchedulerConfiguration,
	ItemSchedulerItem,
	ItemSchedulerRow
} from "@/components/scheduler/types";

export interface ItemSchedulerTimelineProps {
	rows: ItemSchedulerRow[];
	items: ItemSchedulerItem[];
	configuration: ItemSchedulerConfiguration;
	scrollX: number;
	scrollY: number;
}
export interface ItemSchedulerTimelineEvents {
	(eventName: "update:rows", rows: ItemSchedulerRow[]): void;
	(eventName: "update:items", items: ItemSchedulerItem[]): void;
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
