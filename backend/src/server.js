import socketIo from 'socket.io';
import http from 'http';
import { getCityInfo } from './api';
import { getCoordinates } from './redis';

const server = http.createServer();

const io = socketIo(server);

console.log('Websocket server created');

const namesOfCities = [
	'Santiago (CL)',
	'Zurich (CH)',
	'Auckland (NZ)',
	'Sydney (AU)',
	'London (UK)',
	'Georgia (USA)'
];

io.on('connection', function(socket) {
	const intervalId = setInterval(async function() {
		const apiPromises = namesOfCities.map(async cityName => {
			const { latitude, longitude } = await getCoordinates(cityName);

			return await getCityInfo(cityName, latitude, longitude);
		});
		const apiResults = await Promise.all(apiPromises);
		socket.emit('New City Info', apiResults);
	}, 10000);

	console.log('Websocket connection opened');

	socket.on('disconnect', () => {
		console.log('Websocket connection closed');
		clearInterval(intervalId);
	});
});

const port = process.env.PORT || 5000;

server.listen(port);

console.log('Http server listening on %d', port);
