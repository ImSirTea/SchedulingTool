<script lang="ts" setup>
import type { SchedulerRow } from "@/components/scheduler/types";

export interface ItemSchedulerRowProps {
	row: SchedulerRow;
}
export interface ItemSchedulerRowEvents {}

const props = defineProps<ItemSchedulerRowProps>();
const emit = defineEmits<ItemSchedulerRowEvents>();
</script>

<template>Work in progress! 🛠</template>
