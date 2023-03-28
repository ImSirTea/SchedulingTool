import type { LocalDate, LocalDateTime } from "@js-joda/core";

export interface SchedulerConfiguration {
	row: SchedulerRowConfiguration;
	timeline: SchedulerTimelineConfiguration;
}

export interface SchedulerRowConfiguration {
	height: number;
	name: {
		width: number;
	};
}

export interface SchedulerTimelineConfiguration {
	cell: SchedulerTimelineCellConfiguration;
	totalMaxHeight: number;
}

export interface SchedulerTimelineCellConfiguration {
	width: number;
}

export interface SchedulerRow {
	id: string;
	name: string;
}

export interface SchedulerItem {
	id: string;
	name: string;
	date: DateTimePeriod;
}

export interface DateTimePeriod {
	start: LocalDateTime;
	end: LocalDateTime;
}

export interface ScrollPosition {
	x: number;
	y: number;
}
