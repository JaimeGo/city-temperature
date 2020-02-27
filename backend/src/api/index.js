import apiClient from './apiClient';
import { registerApiError } from '../redis';

export async function getCityInfo(cityName, latitude, longitude) {
	try {
		console.log('GETCITYINFO METHOD');
		if (Math.random() < 0.1)
			throw new Error('How unfortunate! The API Request Failed');

		console.log('START CALL TO API');
		const response = await apiClient.get(`/${latitude},${longitude}`);
		console.log('DARKSKYRESPONSE CURRENTLY', response.currently);

		const { currently } = response;
		const { time, temperature } = currently;
		const currentDate = new Date(time);
		console.log('CURRENT DATE', currentDate);
		const hour = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
		console.log('RESPONSE OBJECT', { name: cityName, hour, temperature });
		return { name: cityName, hour, temperature };
	} catch (error) {
		if (error.message === 'How unfortunate! The API Request Failed') {
			await registerApiError(cityName);
		}
	}

	return { name: cityName, hour: null, temperature: null };
}
