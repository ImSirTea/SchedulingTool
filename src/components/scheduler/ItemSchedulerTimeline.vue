<script lang="ts" setup>
import type { ItemSchedulerRow } from "@/components/scheduler/types";

export interface ItemSchedulerTimelineProps {
	rows: ItemSchedulerRow[];
}
export interface ItemSchedulerTimelineEvents {
	(eventName: "update:rows", rows: ItemSchedulerRow[]): void;
}

const props = defineProps<ItemSchedulerTimelineProps>();
const emit = defineEmits<ItemSchedulerTimelineEvents>();
</script>

<template>Work in progress! 🛠</template>
