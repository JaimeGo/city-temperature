import redisClient from './redisClient';

export async function getCoordinates(cityName) {
	try {
		const coordinates = await redisClient.get(cityName);
		return JSON.parse(coordinates);
	} catch (error) {
		console.error(error);
	}
}

export async function registerApiError(cityName) {
	try {
		return await redisClient.hset('api.errors', new Date(), cityName);
	} catch (error) {
		console.error(error);
	}
}
