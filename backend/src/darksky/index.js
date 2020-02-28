import darkskyClient from './darkskyClient';
import {
	registerApiError,
	getHourAndTemperature,
	setHourAndTemperature
} from '../redis';

function formatTime(time, timezone) {
	return new Date(time * 1000).toLocaleTimeString('en-US', {
		timeZone: timezone,
		hour12: false
	});
}

export async function getCityInfo(cityName, latitude, longitude) {
	try {
		if (Math.random() < 0.1)
			throw new Error('How unfortunate! The API Request Failed');

		const response = await darkskyClient.get(`/${latitude},${longitude}`);

		const { currently, timezone } = response.data;
		const { time, temperature } = currently;

		const hour = formatTime(time, timezone);

		await setHourAndTemperature(cityName, hour, temperature.toString());

		return { name: cityName, hour, temperature };
	} catch (error) {
		if (error.message === 'How unfortunate! The API Request Failed') {
			await registerApiError(cityName);
		}
		console.error(error);
		const hourAndTemperature = await getHourAndTemperature(cityName);
		return await { name: cityName, ...hourAndTemperature };
	}
}
