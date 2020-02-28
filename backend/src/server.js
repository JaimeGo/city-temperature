import WebSocketServer from 'ws';
import http from 'http';
import { getCityInfo } from './darksky';
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

const intervalFunction = async function(ws) {
	const apiPromises = namesOfCities.map(async cityName => {
		const { latitude, longitude } = await getCoordinates(cityName);

		return getCityInfo(cityName, latitude, longitude);
	});
	const apiResults = await Promise.all(apiPromises);
	ws.send(JSON.stringify(apiResults));
};

wss.on('connection', async function(ws) {
	// Only gets called when page first loads
	wss.on('message', async function(_) {
		await intervalFunction(ws);
	});

	const intervalId = setInterval(() => intervalFunction(ws), 10000);

	console.log('Websocket connection opened');

	ws.on('close', function() {
		console.log('Websocket connection closed');
		clearInterval(intervalId);
	});
});

const port = process.env.PORT || 5000;

server.listen(port);

console.log('Http server listening on %d', port);
