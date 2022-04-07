/// <reference types="@sveltejs/kit" />

interface Website {
	url: string;
	title: string;
	snippet: string;
}

interface Computation {
	expression: string;
	value: string;
}

interface Context {
	originalQuery: string;
	alteredQuery?: string;
	alterationOverrideQuery?: string;
}

interface Entity {
	name: string;
	url?: string;
	description: string;
}

interface TimeZonePlace {
	location: string;
	time: string;
	utcOffset: string;
	timeZoneName: string;
}
interface TimeZone {
	from: TimeZonePlace;
	to: TimeZonePlace;
}

interface Knowledge {
	context: Context;
	computation?: Computation;
	entities?: Entity[];
	timeZone?: TimeZone;
	relatedSearches?: string[];
}
