import type { LocalDate } from "@js-joda/core";

export interface ItemSchedulerConfiguration {
	row?: ItemSchedulerRowConfiguration;
	column?: ItemSchedulerColumnConfiguration;
}

export interface ItemSchedulerRowConfiguration {
	defaultHeight?: number;
	name?: {
		defaultWidth?: number;
	};
}

export interface ItemSchedulerColumnConfiguration {
	defaultWidth?: number;
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
