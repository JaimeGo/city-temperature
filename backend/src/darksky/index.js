import darkskyClient from './darkskyClient';
import {
	registerApiError,
	getHourAndTemperature,
	setHourAndTemperature
} from '../redis';
import formatTime from './formatTime';

export async function getCityInfo(cityName, latitude, longitude) {
	try {
		console.log('GETCITYINFO METHOD');
		if (Math.random() < 0.1)
			throw new Error('How unfortunate! The API Request Failed');

		console.log('START CALL TO API');
		const response = await darkskyClient.get(`/${latitude},${longitude}`);
		console.log('DARKSKYRESPONSE CURRENTLY', response.data.currently);

		const { currently, timezone } = response.data;
		const { time, temperature } = currently;
		const hour = formatTime(time, timezone);
		await setHourAndTemperature(cityName, hour, temperature.toString());
		console.log('RESPONSE OBJECT', { name: cityName, hour, temperature });
		return { name: cityName, hour, temperature };
	} catch (error) {
		if (error.message === 'How unfortunate! The API Request Failed') {
			await registerApiError(cityName);
		}
		console.error(error);
		return await { name: cityName, ...getHourAndTemperature(cityName) };
	}
}
