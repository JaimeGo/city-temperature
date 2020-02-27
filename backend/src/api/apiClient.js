import axios from 'axios';

const darkskyKey = '6c782e1b4eff74b07389ce26b9753ee4';

export default axios.create({
	baseURL: `https://api.darksky.net/forecast/${darkskyKey}/`
});
