import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

redis.on('connect', function() {
	console.log('Redis client connected');

	const citiesInfo = [
		{
			name: 'Santiago (CL)',
			latitude: '-33.445992',
			longitude: '-70.667061'
		},
		{
			name: 'Zurich (CH)',
			latitude: '47.376888',
			longitude: '8.538030'
		},
		{
			name: 'Auckland (NZ)',
			latitude: '-36.848461',
			longitude: '174.763336'
		},
		{
			name: 'Sydney (AU)',
			latitude: '-33.868820',
			longitude: '151.209290'
		},
		{
			name: 'London (UK)',
			latitude: '51.517576',
			longitude: '-0.079786'
		},
		{
			name: 'Georgia (USA)',
			latitude: '33.756529',
			longitude: '-84.400996'
		}
	];

	citiesInfo.forEach(async cityInfo => {
		const { latitude, longitude } = cityInfo;
		await redis.hset(
			cityInfo.name,
			'latitude',
			latitude,
			'longitude',
			longitude
		);
	});
	console.log(
		'The latitude and the longitude of each city was inserted to Redis'
	);
});

redis.on('error', function(err) {
	console.log('Redis client could not establish connection' + err);
});

export default redis;
