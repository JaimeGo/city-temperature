import darkskyClient from './darkskyClient';
import {
	registerApiError,
	getHourAndTemperature,
	setHourAndTemperature
} from '../redis';

export async function getCityInfo(cityName, latitude, longitude) {
	try {
		console.log('GETCITYINFO METHOD');
		if (Math.random() < 0.1)
			throw new Error('How unfortunate! The API Request Failed');

		console.log('START CALL TO API');
		const response = await darkskyClient.get(`/${latitude},${longitude}`);
		console.log('DARKSKYRESPONSE CURRENTLY', response.data.currently);

		const { currently } = response.data;
		const { time, temperature } = currently;
		const currentDate = new Date(time);
		console.log('CURRENT DATE', currentDate);
		const hour = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
		await setHourAndTemperature(cityName, hour, temperature.toString());
		console.log('RESPONSE OBJECT', { name: cityName, hour, temperature });
		return { name: cityName, hour, temperature };
	} catch (error) {
		if (error.message === 'How unfortunate! The API Request Failed') {
			await registerApiError(cityName);
		}
		console.error(error);
		return await getHourAndTemperature(cityName);
	}
}
