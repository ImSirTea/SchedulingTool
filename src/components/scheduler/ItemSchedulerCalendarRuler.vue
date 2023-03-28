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
	const monthsWithYear: {
		month: string;
		year: number;
		numberOfDays: number;
	}[] = [];
	const days: number[] = [];

	let currentMonth: string = props.schedulerDateTimePeriod.start
		.month()
		.name();
	const currentYear: number = props.schedulerDateTimePeriod.start.year();
	let numberOfDays: number = 0;

	for (let i = 0; i <= props.schedulerDateTimePeriod.length; i++) {
		const workingDate = props.schedulerDateTimePeriod.start.plusDays(i);
		const workingMonth = workingDate.month().name();

		days.push(workingDate.dayOfMonth());

		// If we swap to a new month, or are at the end of the list without pushing
		if (
			currentMonth !== workingMonth ||
			i === props.schedulerDateTimePeriod.length
		) {
			monthsWithYear.push({
				month: currentMonth,
				year: currentYear,
				numberOfDays
			});
			currentMonth = workingMonth;
			numberOfDays = 0;
		}

		numberOfDays += 1;
	}

	return {
		monthsWithYear,
		days
	};
});
</script>

<template>
	<div class="scheduler-calendar-ruler">
		<div class="scheduler-calendar-months">
			<div
				v-for="monthWithYear in daysAndMonthsWithYear.monthsWithYear"
				:key="monthWithYear.month + monthWithYear.year"
				:style="{
					width:
						monthWithYear.numberOfDays *
							configuration.timeline.cell.width +
						'px'
				}"
				class="scheduler-calendar-month"
			>
				{{ monthWithYear.month }} {{ monthWithYear.year }}
			</div>
		</div>
		<div class="scheduler-calendar-days">
			<div
				v-for="(day, idx) in daysAndMonthsWithYear.days"
				:key="day.toString() + idx.toString()"
				:style="{
					width: configuration.timeline.cell.width + 'px'
				}"
				class="scheduler-calendar-day"
			>
				{{ day }}
			</div>
		</div>
	</div>
</template>

<style>
.scheduler-calendar-ruler {
	grid-area: calendar;
}

.scheduler-calendar-months {
	display: flex;
}

.scheduler-calendar-days {
	display: flex;
}
</style>
