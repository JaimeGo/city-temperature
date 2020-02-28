import darkskyClient from './darkskyClient';
import {
	registerApiError,
	getHourAndTemperature,
	setHourAndTemperature
} from '../redis';
import formatTime from './formatTime';

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
		return await { name: cityName, ...getHourAndTemperature(cityName) };
	}
}
