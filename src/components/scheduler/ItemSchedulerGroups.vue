<script lang="ts" setup>
import type { ItemSchedulerRow } from "@/components/scheduler/types";

export interface ItemSchedulerGroupsProps {
	rows: ItemSchedulerRow[];
	scrollY: number;
	width: number;
}

export interface ItemSchedulerGroupsEvents {
	(eventName: "update:scroll-y", newScrollY: number): void;
	(eventName: "update:width", newWidth: number): void;
}

const props = defineProps<ItemSchedulerGroupsProps>();
const emit = defineEmits<ItemSchedulerGroupsEvents>();
</script>

<template>
	<div class="scheduler-groups">Work in progress! 🛠</div>
</template>

<style>
.scheduler-groups {
	grid-area: groups;
}
</style>
