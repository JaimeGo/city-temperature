import moment from 'moment-timezone';

export default function getTimeInTimezone(cityName, timeInSeconds) {
	let tzTime;
	switch (cityName) {
	case 'Santiago (CL)':
		tzTime = moment.tz(timeInSeconds, 'America/Santiago');
		break;
	case 'Zurich (CH)':
		tzTime = moment.tz(timeInSeconds, 'Europe/Zurich');
		break;
	case 'Auckland (NZ)':
		tzTime = moment.tz(timeInSeconds, 'Pacific/Auckland');
		break;
	case 'Sydney (AU)':
		tzTime = moment.tz(timeInSeconds, 'Australia/Sydney');
		break;
	case 'London (UK)':
		tzTime = moment.tz(timeInSeconds, 'Europe/London');
		break;
	case 'Georgia (USA)':
		// Same timezone, Georgia is not available
		tzTime = moment.tz(timeInSeconds, 'America/Nassau');
	}
	return tzTime.format('hh:mm');
}
