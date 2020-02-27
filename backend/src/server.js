import WebSocketServer from 'ws';
import http from 'http';
import { getCityInfo } from './api';
import { getCoordinates } from './redis';

const server = http.createServer();

const wss = new WebSocketServer.Server({ server: server });

console.log('Websocket server created');

const namesOfCities = [
	'Santiago (CL)',
	'Zurich (CH)',
	'Auckland (NZ)',
	'Sydney (AU)',
	'London (UK)',
	'Georgia (USA)'
];

wss.on('connection', function(ws) {
	const intervalId = setInterval(function() {
		const apiResults = namesOfCities.map(async cityName => {
			const { latitude, longitude } = await getCoordinates(cityName);

			return await getCityInfo(cityName, latitude, longitude);
		});
		ws.send(JSON.stringify(apiResults));
	}, 10000);

	console.log('Websocket connection opened');

	ws.on('close', function() {
		console.log('Websocket connection closed');
		clearInterval(intervalId);
	});
});

const port = process.env.PORT || 5000;

server.listen(port);

console.log('Http server listening on %d', port);
