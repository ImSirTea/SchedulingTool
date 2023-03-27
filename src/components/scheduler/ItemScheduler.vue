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
	configuration?: ItemSchedulerConfiguration;
}
export interface ItemSchedulerEvents {}

const props = defineProps<ItemSchedulerProps>();
const emit = defineEmits<ItemSchedulerEvents>();

const DEFAULT_CONFIGURATION: ItemSchedulerConfiguration = {
	row: {
		defaultHeight: 50,
		name: {
			defaultWidth: 300
		}
	},
	column: {
		defaultWidth: 40
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

const groupsWidth = ref<number>(300);
const internalRows = shallowRef<ItemSchedulerRow[]>([]);
const internalItems = shallowRef<ItemSchedulerItem[]>([]);
</script>

<template>
	<div
		class="scheduler-container"
		:style="{ gridTemplateColumns: `${groupsWidth}px auto` }"
	>
		<item-scheduler-calendar-ruler
			:rows="internalRows"
			v-model:scroll-x="scrollPosition.x"
		/>
		<item-scheduler-groups
			:rows="internalRows"
			v-model:scroll-y="scrollPosition.y"
			v-model:width="groupsWidth"
		/>
		<item-scheduler-timeline
			v-model:rows="internalRows"
			v-model:items="internalItems"
			v-model:scroll-x="scrollPosition.x"
			v-model:scroll-y="scrollPosition.y"
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
