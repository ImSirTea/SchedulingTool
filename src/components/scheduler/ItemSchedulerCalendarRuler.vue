<script lang="ts" setup>
import type { ItemSchedulerRow } from "@/components/scheduler/types";

export interface ItemSchedulerCalendarProps {
	rows: ItemSchedulerRow[];
}
export interface ItemSchedulerCalendarEvents {}

const props = defineProps<ItemSchedulerCalendarProps>();
const emit = defineEmits<ItemSchedulerCalendarEvents>();
</script>

<template>Work in progress! 🛠</template>
