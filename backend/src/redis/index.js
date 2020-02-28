import redisClient from './redisClient';

export async function getCoordinates(cityName) {
	try {
		console.log('GETCOORDS');
		const { latitude, longitude } = await redisClient.hgetall(cityName);
		return { latitude, longitude };
	} catch (error) {
		console.error(error);
	}
}

export async function getHourAndTemperature(cityName) {
	try {
		console.log('GETHOUR');
		const { hour, temperature } = await redisClient.hgetall(cityName);
		return { hour, temperature };
	} catch (error) {
		console.error(error);
	}
}

export async function setHourAndTemperature(cityName, hour, temperature) {
	try {
		console.log('SETHOUR');
		await redisClient.hmset(cityName, { hour, temperature });
	} catch (error) {
		console.error(error);
	}
}

export async function registerApiError(cityName) {
	try {
		console.log('REGISTERERROR');
		return await redisClient.hset('api.errors', new Date(), cityName);
	} catch (error) {
		console.error(error);
	}
}
