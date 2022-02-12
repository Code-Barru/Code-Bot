const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const connectionSQL = require('../../bot');


const getRiotAccount = require('../../functions/league/getRiotAccount');
const getQueue = require('../../functions/league/getQueue');
const getMatchHistory = require('../../functions/league/getMatchHistory');


function getProfileEmbed(accountData, queueData, history) {


	//console.log(queueData);
	if (queueData ) {
		tmp = `${queueData.tier} ${queueData.rank} ${queueData.leaguePoints}LP` +
			  `  (${(queueData.wins*100 / (queueData.wins + queueData.losses)).toPrecision(3)}%)`
	} else {
		tmp = 'Unranked'
	}
	
	const queueFields = []
	const profile = {name: `Rank SoloQ`, value : tmp, inline:true}
	const games = {name: `Last ${history.length} games :`, value : ''}
	
	if (history.length != 0 )
		for (var i = 0 ; i < history.length ; i++) {

			if (i == 0)
				games.value = `${history[i].champion}\t${history[i].kills}/${history[i].deaths}/${history[i].assists}\n`
			else
				games.value+= `${history[i].champion}\t${history[i].kills}/${history[i].deaths}/${history[i].assists}\n`
		}
	else 
		games.value = `Pas de games depuis tah l'époque.`;

	queueFields.push(profile);
	queueFields.push(games)

	const profileEmbed = new MessageEmbed()
	.setColor('#FF0000')
	.setThumbnail(`https://opgg-static.akamaized.net/images/profile_icons/profileIcon${accountData.profileIconId}.jpg`)
	.setURL(`https://euw.op.gg/summoner/userName=${accountData.name.replaceAll(' ', '%20')}`)
	.setTitle(`${accountData.name}`)
	.addFields(queueFields)

	return profileEmbed
}


async function processApis(interaction, summonerName) {

	const accountData = await getRiotAccount(
		summonerName, 
		'euw'
	);

	if (!accountData) {
		interaction.editReply(`**Le summoner ${summonerName} n'existe pas dans la région ${'euw'}** :x:`)
		return;
	}

	const queueData = await getQueue(accountData, 'euw');

	// if (queueData.length == 0) {
	// 	interaction.editReply(`Le summoner **${summonerName}** n'a pas fait de game depuis tah l'époque.`);
	// 	return;
	// }

	const history = await getMatchHistory(accountData, 'europe', 5)

	//console.log(queueData);
	for (var i=0 ; i < queueData.length ; i++) {
		if (queueData[i].queueType == 'RANKED_SOLO_5x5') {
			interaction.editReply( {content: `**Profile de ${accountData.name}**`, embeds : [getProfileEmbed(accountData, queueData[i], history)] });
			return;
		}
	}

	interaction.editReply( {content: `**Profile de ${accountData.name}**`,embeds : [getProfileEmbed(accountData, null, history)] });

}
	
module.exports = {
	data: new SlashCommandBuilder()
		.setName('profilelol')
		.setDescription('Affiche le profile d\'un joueur de LoL.')
		.addStringOption(
			option => option.setName('compte')
			.setDescription('Le pseudo LoL du joueur.')
			.setRequired(false)
		)
		.addUserOption(
			option => option.setName('personne')
			.setDescription('La personne du discord possèdant un compte LoL.')
			.setRequired(false)
		),
	
	async execute(interaction, client) {

		var summonerName = interaction.options.getString('compte');
		var compteDiscord = interaction.options.getUser('personne');

		await interaction.reply('**Loading...**');

		if (compteDiscord) {

			//console.log(compteDiscord);

			connectionSQL.query('SELECT summonerName FROM accounts WHERE discordID=?',
			[compteDiscord.id],
			async function(err,res,fields) {
				if (err) {
					console.log(err);
				}
				if (res.length > 0)
					await processApis(interaction, res[0].summonerName);
				else
					interaction.editReply(`${compteDiscord.username} n'est pas enregistré !`);
			})
		}

		else if (!summonerName && !compteDiscord) {	
			connectionSQL.query('SELECT summonerName FROM accounts WHERE discordID=?',
			[interaction.user.id], 
			async function(err,res,fields) {
				if (err) {
					console.log(err);
				}
				if (res.length > 0)
					await processApis(interaction, res[0].summonerName);
				else
					interaction.editReply('Tu n\'es pas enregistré et tu n\'a pas donné de compte !')
			})
		}
		
		else {
			processApis(interaction, summonerName);
		}
		
		
	}
}
