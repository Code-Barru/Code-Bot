const axios = require('axios');

module.exports = async function getQueue(accountId, region) {

	url = `https://${region}1.api.riotgames.com/lol/league/v4/entries/by-summoner/${accountId}?api_key=${process.env.RIOT_API_TOKEN}`
	
	data = await axios.get(url).then(res => {
		return res.data;
	}).catch(error => {
		console.error(error);
	})

	return data;
}