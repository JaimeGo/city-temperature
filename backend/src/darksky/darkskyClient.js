import axios from 'axios';

const darkskyKey = process.env.DARKSKY_KEY;

export default axios.create({
	baseURL: `https://api.darksky.net/forecast/${darkskyKey}/`
});
