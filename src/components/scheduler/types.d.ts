import type { LocalDate } from "@js-joda/core";

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
