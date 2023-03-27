<script lang="ts" setup>
import ItemSchedulerCalendarRuler from "@/components/scheduler/ItemSchedulerCalendarRuler.vue";
import ItemSchedulerGroups from "@/components/scheduler/ItemSchedulerGroups.vue";
import ItemSchedulerTimeline from "@/components/scheduler/ItemSchedulerTimeline.vue";
import type {
	ItemSchedulerConfiguration,
	ItemSchedulerItem,
	ItemSchedulerRow,
	ScrollPosition
} from "@/components/scheduler/types";
import { computed, reactive, ref, shallowRef } from "vue";
export interface ItemSchedulerProps {
	rows: ItemSchedulerRow[];
	items: ItemSchedulerItem[];
	configuration?: Partial<ItemSchedulerConfiguration>;
}
export interface ItemSchedulerEvents {}

const props = defineProps<ItemSchedulerProps>();
const emit = defineEmits<ItemSchedulerEvents>();

const internalRows = shallowRef<ItemSchedulerRow[]>([]);
const internalItems = shallowRef<ItemSchedulerItem[]>([]);

const DEFAULT_CONFIGURATION: ItemSchedulerConfiguration = {
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
