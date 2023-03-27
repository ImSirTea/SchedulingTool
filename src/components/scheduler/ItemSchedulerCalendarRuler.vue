<script lang="ts" setup>
import type { ItemSchedulerRow } from "@/components/scheduler/types";

export interface ItemSchedulerCalendarProps {
	rows: ItemSchedulerRow[];
	scrollX: number;
}

export interface ItemSchedulerCalendarEvents {
	(eventName: "update:scroll-x", newScrollX: number): void;
}

const props = defineProps<ItemSchedulerCalendarProps>();
const emit = defineEmits<ItemSchedulerCalendarEvents>();
</script>

<template>Work in progress! 🛠</template>
