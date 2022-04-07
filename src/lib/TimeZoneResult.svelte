<script lang="ts">
	import Result from "./Result.svelte";

	export let timeZone: TimeZone;

	function formatTime(datetime: string): string {
		return new Date(datetime).toLocaleString(undefined, {
			timeZone: "UTC",
			weekday: "long",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
		});
	}
</script>

<Result title={formatTime(timeZone.to.time)}>
	{timeZone.from.location} ({timeZone.from.timeZoneName}, {timeZone.from.utcOffset})
	{formatTime(timeZone.from.time)} to {timeZone.to.location} ({timeZone.to.timeZoneName}, {timeZone
		.to.utcOffset})
</Result>
