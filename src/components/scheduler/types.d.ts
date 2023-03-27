import type { LocalDate } from "@js-joda/core";
import type exp from "constants";

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
