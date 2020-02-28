import WebSocketServer from 'ws';
import http from 'http';
import { fetchCityData } from './darksky';
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

async function intervalProcess(ws) {
	const apiPromises = namesOfCities.map(async cityName => {
		const { latitude, longitude } = await getCoordinates(cityName);

		return await fetchCityData(cityName, latitude, longitude);
	});
	const apiResults = await Promise.all(apiPromises);
	console.log('Api results: ', apiResults);
	ws.send(JSON.stringify(apiResults));
}

wss.on('connection', function(ws) {
	intervalProcess(ws);
	const intervalId = setInterval(() => intervalProcess(ws), 10000);

	console.log('Websocket connection opened');

	ws.on('close', function() {
		console.log('Websocket connection closed');
		clearInterval(intervalId);
	});
});

const port = process.env.PORT || 5000;

server.listen(port);

console.log('Http server listening on %d', port);
