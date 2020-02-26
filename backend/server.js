import WebSocket from 'ws';
import axios from 'axios';

const ws = new WebSocket('ws://localhost.com:3001/ws', {
	perMessageDeflate: false
});

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

const darkskyKey = '6c782e1b4eff74b07389ce26b9753ee4';

ws.on('connection', function connection(ws) {
	setInterval(() => {
		const citiesResults = citiesInfo.map(cityInfo => {
			const { name } = cityInfo;

			axios
				.get(
					`https://api.darksky.net/forecast/${darkskyKey}/${cityInfo.latitude},${cityInfo.longitude}`
				)
				.then(function(response) {
					if (Math.rand(0, 1) < 0.1)
						throw new Error('How unfortunate! The API Request Failed');

					const { currently } = response;
					const { time, temperature } = currently;
					const currentDate = new Date(time);
					const hour = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
					return { name, hour, temperature };
				})
				.catch(function(error) {
					return { name, hour: 'No new data', temperature: 'No new data' };
				})
				.then(function() {
					// always executed
				});
		});

		ws.send(citiesResults);
	}, 10000);
});
