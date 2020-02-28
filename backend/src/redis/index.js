import redisClient from './redisClient';

export async function getCoordinates(cityName) {
	try {
		console.log('GETCOORDS');
		const latitude = await redisClient.hget(cityName, 'latitude');
		const longitude = await redisClient.hget(cityName, 'longitude');
		return { latitude, longitude };
	} catch (error) {
		console.error(error);
	}
}

export async function getHourAndTemperature(cityName) {
	try {
		console.log('GETHOUR');
		const hour = await redisClient.hget(cityName, 'hour');
		const temperature = await redisClient.hget(cityName, 'temperature');
		return { hour, temperature };
	} catch (error) {
		console.error(error);
	}
}

export async function setHourAndTemperature(cityName, hour, temperature) {
	try {
		console.log('SETHOUR');
		await redisClient.hset(cityName, 'hour', hour);
		await redisClient.hset(cityName, 'temperature', temperature);
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
