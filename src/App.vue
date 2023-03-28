<script setup lang="ts">
import ItemScheduler from "@/components/scheduler/ItemScheduler.vue";
import type { SchedulerItem } from "@/components/scheduler/types";
import { LocalDate, LocalDateTime, LocalTime } from "@js-joda/core";

const testItems: SchedulerItem[] = Array(50)
	.fill(0)
	.map((_, id): SchedulerItem => {
		return {
			id: id.toString(),
			name: id.toString(),
			date: {
				start: LocalDateTime.of(
					LocalDate.now().plusDays(id),
					LocalTime.NOON
				),

				end: LocalDateTime.of(
					LocalDate.now().plusDays(id + 3),
					LocalTime.NOON
				)
			}
		};
	});
</script>

<template>
	<div class="container">
		<item-scheduler :rows="[]" :items="testItems" />
	</div>
</template>

<style scoped>
.container {
	width: 75vw;
	height: 75vh;
}
</style>
