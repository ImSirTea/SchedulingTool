<script lang="ts" setup>
import ItemSchedulerCalendarRuler from "@/components/scheduler/ItemSchedulerCalendarRuler.vue";
import ItemSchedulerGroups from "@/components/scheduler/ItemSchedulerGroups.vue";
import ItemSchedulerTimeline from "@/components/scheduler/ItemSchedulerTimeline.vue";
import type {
	SchedulerConfiguration,
	SchedulerItem,
	SchedulerRow,
	ScrollPosition,
	DateTimePeriod
} from "@/components/scheduler/types";
import { ChronoUnit, LocalDateTime } from "@js-joda/core";
import { computed, reactive, shallowRef } from "vue";
export interface ItemSchedulerProps {
	rows: SchedulerRow[];
	items: SchedulerItem[];
	configuration?: Partial<SchedulerConfiguration>;
}

export interface ItemSchedulerEvents {}

export interface SchedulerDateTimePeriod extends DateTimePeriod {
	length: number;
}

const props = defineProps<ItemSchedulerProps>();
const emit = defineEmits<ItemSchedulerEvents>();

const internalRows = shallowRef<SchedulerRow[]>([]);
const internalItems = shallowRef<SchedulerItem[]>([]);

const DEFAULT_CONFIGURATION: SchedulerConfiguration = {
	row: {
		height: 50,
		name: {
			width: 300
		}
	},
	timeline: {
		totalMaxHeight: 500,
		cell: {
			width: 40
		}
	}
};

const scrollPosition = reactive<ScrollPosition>({
	x: 0,
	y: 0
});

const configuration = computed(() => ({
	...DEFAULT_CONFIGURATION,
	...props.configuration
}));

const schedulerDateTimePeriod = computed<SchedulerDateTimePeriod>(() =>
	props.items.reduce(
		({ start, end }, currItem) => {
			const earliestDateTime = start.isBefore(currItem.date.start)
				? start
				: currItem.date.start;

			const latestDateTime = end.isAfter(currItem.date.end)
				? end
				: currItem.date.end;

			const periodLength = ChronoUnit.DAYS.between(
				earliestDateTime,
				latestDateTime
			);

			return {
				start: earliestDateTime,
				end: latestDateTime,
				length: periodLength
			};
		},
		{ start: LocalDateTime.now(), end: LocalDateTime.now(), length: 0 }
	)
);
</script>

<template>
	<div
		class="scheduler-container"
		:style="{
			gridTemplateColumns: `${configuration.row.name.width}px auto`
		}"
	>
		<item-scheduler-calendar-ruler
			v-model:scroll-x="scrollPosition.x"
			:rows="internalRows"
			:configuration="configuration"
			:scheduler-date-time-period="schedulerDateTimePeriod"
		/>
		<item-scheduler-groups
			v-model:scroll-y="scrollPosition.y"
			v-model:width="configuration.row.name.width"
			:rows="internalRows"
			:configuration="configuration"
		/>
		<item-scheduler-timeline
			v-model:rows="internalRows"
			v-model:items="internalItems"
			v-model:scroll-x="scrollPosition.x"
			v-model:scroll-y="scrollPosition.y"
			:configuration="configuration"
		/>
	</div>
</template>

<style>
.scheduler-container {
	display: grid;
	grid-template-columns: 50px 50px;
	grid-template-rows: auto;
	grid-template-areas:
		". calendar"
		"groups timeline";
}
</style>
