<script lang="ts" setup>
import type { ItemSchedulerRow } from "@/components/scheduler/types";

export interface ItemSchedulerGroupsProps {
	rows: ItemSchedulerRow[];
	scrollY: number;
}

export interface ItemSchedulerGroupsEvents {
	(eventName: "update:scroll-y", newScrollY: number): void;
}

const props = defineProps<ItemSchedulerGroupsProps>();
const emit = defineEmits<ItemSchedulerGroupsEvents>();
</script>

<template>Work in progress! 🛠</template>
