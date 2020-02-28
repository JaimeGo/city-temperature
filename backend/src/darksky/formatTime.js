export default function formatTime(time, timezone) {
	return new Date(time * 1000).toLocaleTimeString('en-US', {
		timeZone: timezone,
		hour12: false
	});
}
