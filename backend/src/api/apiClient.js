import axios from 'axios';

const darkskyKey = '39779faae4ec01076fb6f7fd99daba43';

export default axios.create({
	baseURL: `https://api.darksky.net/forecast/${darkskyKey}/`
});
