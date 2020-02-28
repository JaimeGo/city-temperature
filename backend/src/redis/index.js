import redisClient from './redisClient';

export async function getCoordinates(cityName) {
	try {
		const { latitude, longitude } = await redisClient.hgetall(cityName);
		return { latitude, longitude };
	} catch (error) {
		console.error(error);
	}
}

export async function getHourAndTemperature(cityName) {
	try {
		const { hour, temperature } = await redisClient.hgetall(cityName);
		return { hour, temperature };
	} catch (error) {
		console.error(error);
	}
}

export async function setHourAndTemperature(cityName, hour, temperature) {
	try {
		await redisClient.hmset(cityName, 'hour', hour, 'temperature', temperature);
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
