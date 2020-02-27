import apiClient from './apiClient';
import { registerApiError } from '../redis';

export async function getCityInfo(cityName, latitude, longitude) {
	try {
		if (Math.rand(0, 1) < 0.1)
			throw new Error('How unfortunate! The API Request Failed');

		const response = await apiClient.get(`/${latitude},${longitude}`);
		console.log('DARKSKYRESPONSE', response);

		const { currently } = response;
		const { time, temperature } = currently;
		const currentDate = new Date(time);
		const hour = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
		return { name: cityName, hour, temperature };
	} catch (error) {
		if (error.message === 'How unfortunate! The API Request Failed') {
			await registerApiError(cityName);
		}
	}

	return { name: cityName, hour: null, temperature: null };
}
