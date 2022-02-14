const { MessageEmbed } = require('discord.js');
const getQueue = require('./getQueue');
//const connectionSQL = require('../../bot')

// query all players tracked
// check if they rank changed
// if so, send a message to all guild that track that player
// insert into the database

// await client.channels.cache.get(interaction.channelId).send("ça marche");

function getTierValue(tier) {

	switch(tier){
		case 'UNRANKED':
			return 0;
		case 'IRON':
			return 1;
		case 'BRONZE':
			return 2;
		case 'SILVER':
			return 3;
		case 'GOLD':
			return 4;
		case 'PLATINUM':
			return 5;
		case 'DIAMOND':
			return 6;
		case 'MASTER':
			return 7;
		case 'GRANDMASTER':
			return 8;
		case 'CHALLENGER':
			return 9;
	}
}

function getRankValue(value) {
	switch(value) {
		case 'I':
			return 1;
		case 'II':
			return 2;
		case 'III':
			return 3;
		case 'IV':
			return 4;
	}
}

function compareRanks(newRank, rank) {

	if (getTierValue(newRank.tier) > getTierValue(rank.tier))
		return '+tier'
	if (getTierValue(newRank.tier) < getTierValue(rank.tier))
		return '-tier'

	if (getRankValue(newRank.rank) < getRankValue(rank.rank))
		return '+rank'
	if (getRankValue(newRank.rank) > getRankValue(rank.rank))
		return '-rank'

	if (newRank.LP > rank.LP)
		return '+lp'
	if (newRank.LP < rank.LP)
		return '-lp'
	
	return 'ERROR'
}

async function sendUpdate(client, connectionSQL, queueData, account, rankStatus) {

	connectionSQL.query(`
	SELECT channelID 
	FROM guildChannels 
	INNER JOIN guildTrack 
	ON guildTrack.guildID=guildChannels.guildID 
	WHERE summonerName=?`,
	[account.name],	
	async function(error, result, fields) {
		if (error) {
			console.log(error);
			return;
		}

		var str = '';

		if (rankStatus.charAt(0) == '+') {
			str = ':chart_with_upwards_trend:'
			if (rankStatus == '+tier' || rankStatus == '+rank') {
				str += `**${account.name}** got promoted to **${queueData.tier} ${queueData.rank}**.`
			} 
			else if (rankStatus == '+lp') {
				str += `**${account.name}** won **${queueData.leaguePoints - account.LP}** LP.\n`
				str += `\`${account.tier} ${account.rank} ${account.LP} LP => ${queueData.tier} ${queueData.rank} ${queueData.leaguePoints} LP\``
			}
		} 
		else if (rankStatus.charAt(0) == '-' ) {
			str = ':chart_with_downwards_trend:'
			if (rankStatus == '-tier' || rankStatus == '-rank') {
				str += `**${account.name}** got demoted to **${queueData.tier} ${queueData.rank}**.`	
			} 
			else if (rankStatus == '-lp') {
				str += `**${account.name}** lost **${account.LP - queueData.leaguePoints}** LP.\n`
				str += `\`${account.tier} ${account.rank} ${account.LP} LP => ${queueData.tier} ${queueData.rank} ${queueData.leaguePoints} LP\``
			}
		}

		for (const guildChannels of result) {
			
			await client.channels.cache.get(guildChannels.channelID).send(str);
		}
	})
}

async function processPlayer(client, connectionSQL, account) {

	var queueData = await getQueue(account, 'euw')


	for (var i=0 ; i < queueData.length ; i++) {
		if (queueData[i].queueType == 'RANKED_SOLO_5x5') {
			queueData = queueData[i];
		}
	}

	if (queueData.length == 0)
		return;

	if (queueData.tier == account.tier && 
		queueData.rank == account.rank && 
		queueData.leaguePoints == account.LP)
		return

	const newRank = {rank : queueData.rank, tier: queueData.tier, LP: queueData.leaguePoints};
	const rank = {rank : account.rank, tier: account.tier, LP: account.LP};

	rankStatus = compareRanks(newRank, rank);


	console.log('======\n['+account.name+'] ')
	console.log(queueData.leaguePoints + ' ' + account.LP)
	console.log(queueData.tier + ' ' + account.tier)
	console.log(queueData.rank + ' ' + account.rank + '\n======')


	if (rankStatus == 'ERROR'){
		console.log('[ERREUR]')

		return;
	}
		

	connectionSQL.query('SELECT ID FROM lolplayers WHERE summonerName=?',
	[account.name],
	function(err,res,f){
		connectionSQL.query(`INSERT INTO lolgames (ID, TIER, \`RANK\`, LPs) VALUES (?,?,?,?)`,
		[res[0].ID,queueData.tier, queueData.rank, queueData.leaguePoints],
		async function(error, result, fields) {
			if (error) {
				console.log(error);
				return;
			}
			if (account.tier == 'UNRANKED')
				connectionSQL.query(`
				SELECT channelID 
				FROM guildChannels 
				INNER JOIN guildTrack 
				ON guildTrack.guildID=guildChannels.guildID 
				WHERE summonerName=?`,
				[account.name], 
				async function(error0, result0, fields) {
					
					if (error0) {
						console.log(error0);
						return;
					}

					for (const guildChannels of result0){
						await client.channels.cache.
						get(guildChannels.channelID).
						send(`**${account.name}** a fini ses placements et est arrivé **${queueData.tier} ${queueData.rank}**`);
					}
				})
		})
	})
	
	if (account.tier == 'UNRANKED') return;

	
	await sendUpdate(client, connectionSQL, queueData, account, rankStatus);
}


async function getPlayer(client, connectionSQL, account) {

	connectionSQL.query(`
	SELECT * 
	FROM lolgames 
	WHERE query_date=(
		SELECT MAX(query_date) 
		FROM lolgames
		WHERE ID=(
			SELECT ID
			FROM lolplayers
			WHERE summonerName=?
		)
	)`,
	[account.summonerName],
	async function(error,result,fields) {
		if (error) {
			console.log(error);
			return;
		}

		await processPlayer(client, connectionSQL, {
			BDid : account.ID,
			name : account.summonerName,
			id : account.summonerID, 
			tier: result[0].TIER, 
			rank: result[0].RANK, 
			LP : result[0].LPs
		})
	})
}

module.exports = async function processTracking(client,connectionSQL) {
	
	connectionSQL.query(`
	SELECT * 
	FROM lolplayers
	ORDER BY ID`,
	async function(error,result,fields) {

		if (error) {
			console.log(error);
			return;
		}

		for (const account of result) {
			await getPlayer(client, connectionSQL,account);
		}
	})
};