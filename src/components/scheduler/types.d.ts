import type { LocalDate } from "@js-joda/core";

export interface ItemSchedulerConfiguration {
	row: ItemSchedulerRowConfiguration;
	timeline: ItemSchedulerTimelineConfiguration;
}

export interface ItemSchedulerRowConfiguration {
	height: number;
	name: {
		width: number;
	};
}

export interface ItemSchedulerTimelineConfiguration {
	cell: ItemSchedulerTimelineCellConfiguration;
	totalMaxHeight: number;
}

export interface ItemSchedulerTimelineCellConfiguration {
	width: number;
}

export interface ItemSchedulerRow {
	id: string;
	name: string;
}

export interface ItemSchedulerItem {
	id: string;
	name: string;
}

export interface DatePeriod {
	start: LocalDate;
	end: LocalDate;
}

export interface ScrollPosition {
	x: number;
	y: number;
}
