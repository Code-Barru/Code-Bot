const axios = require('axios');


module.exports = async function getMatchHistory(accountId, region, nbGame) {

	url = `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${accountId.puuid}/ids?start=0&count=${nbGame}&api_key=${process.env.RIOT_API_TOKEN}`

	matchIDs = await axios.get(url).then(res => {
		return res.data;
	}).catch(error => {
		console.error(error);
	})

	url = `https://${region}.api.riotgames.com/lol/match/v5/matches/`

	history = []

	for (const id of matchIDs) {

		tmpURL = url + id + '?api_key=' + process.env.RIOT_API_TOKEN;

		match = await axios.get(tmpURL).then(res => {
			return res.data;
		}).catch(error => {
			console.error(error);
		})

		for(var i=0 ; i < match.info.participants.length ; i++) {

			if (match.info.participants[i].summonerName == accountId.name) {

				match = {
					kills : match.info.participants[i].kills,
					deaths : match.info.participants[i].deaths,
					assists : match.info.participants[i].assists,
					champion : match.info.participants[i].championName
				}

				history.push(match)

				break;
			}
		}

	}

	return history;
}