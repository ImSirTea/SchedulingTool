<script lang="ts" setup>
import type { SchedulerDateTimePeriod } from "@/components/scheduler/ItemScheduler.vue";
import type {
	SchedulerConfiguration,
	SchedulerRow
} from "@/components/scheduler/types";
import { computed } from "vue";

export interface ItemSchedulerCalendarProps {
	rows: SchedulerRow[];
	configuration: SchedulerConfiguration;
	scrollX: number;
	schedulerDateTimePeriod: SchedulerDateTimePeriod;
}

export interface ItemSchedulerCalendarEvents {
	(eventName: "update:scroll-x", newScrollX: number): void;
}

const props = defineProps<ItemSchedulerCalendarProps>();
const emit = defineEmits<ItemSchedulerCalendarEvents>();

// @TODO: I don't think I like this approach
const daysAndMonthsWithYear = computed(() => {
	const monthsWithYear: { month: string; year: number }[] = [];
	const days: number[] = [];

	let currentMonth: string = "";

	for (let i = 0; i <= props.schedulerDateTimePeriod.length; i++) {
		const workingDate = props.schedulerDateTimePeriod.start.plusDays(i);
		const workingYear = workingDate.year();
		const workingMonth = workingDate.month().name();

		days.push(workingDate.dayOfMonth());

		if (currentMonth !== workingMonth) {
			monthsWithYear.push({ month: workingMonth, year: workingYear });
			currentMonth = workingMonth;
		}
	}

	return {
		monthsWithYear,
		days
	};
});
</script>

<template>
	<div class="scheduler-calendar-ruler">
		<div
			v-for="monthWithYear in daysAndMonthsWithYear.monthsWithYear"
			:key="monthWithYear.month + monthWithYear.year"
		>
			{{ monthWithYear.month }} {{ monthWithYear.year }}
		</div>
		<div
			v-for="(day, idx) in daysAndMonthsWithYear.days"
			:key="day.toString() + idx.toString()"
		>
			{{ day }}
		</div>
	</div>
</template>

<style>
.scheduler-calendar-ruler {
	grid-area: calendar;
}
</style>
