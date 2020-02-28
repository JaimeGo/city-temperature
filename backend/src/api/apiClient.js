import axios from 'axios';

const darkskyKey = '34be6c91a7242250aa974b11862e87a0';

export default axios.create({
	baseURL: `https://api.darksky.net/forecast/${darkskyKey}/`
});
