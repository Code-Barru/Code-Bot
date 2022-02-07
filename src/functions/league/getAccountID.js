const axios = require('axios');

module.exports = async function getAccountID(summonerName, region) {

	url = encodeURI(`https://${region}1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.RIOT_API_TOKEN}`)

	data = await axios.get(url).then(res => {
		//console.log(res.data)
		return res.data;
	 })
	 .catch(error => {
		//console.error(error)
		return
	 })

	//console.log(data);
	return data;
};
