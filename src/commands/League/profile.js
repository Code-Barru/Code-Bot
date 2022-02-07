const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

const getAccountID = require('../../functions/league/getAccountID');
const getQueue = require('../../functions/league/getQueue');
const getMatchHistory = require('../../functions/league/getMatchHistory');


function getProfileEmbed(accountData, queueData, history) {


	if (queueData.length != 0 ) {
		tmp = `${queueData[0].tier} ${queueData[0].rank} ${queueData[0].leaguePoints}LP
		${queueData[0].wins}W | ${queueData[0].losses}L (${(queueData[0].wins*100 / (queueData[0].wins + queueData[0].losses)).toPrecision(3)}%)`

	} else {
		tmp = 'Unranked'
	}
	
	const queueFields = []

	const profile = {name: `Rank SoloQ`, value : tmp, inline:true}

	queueFields.push(profile);

	const games = {name: `Last ${history.length} games :`, value : ''}

	for (var i = 0 ; i < 5 ; i++) {

		if (i == 0)
			games.value = `${history[i].champion}\t${history[i].kills}/${history[i].deaths}/${history[i].assists}\n`
		else
			games.value += `${history[i].champion}\t${history[i].kills}/${history[i].deaths}/${history[i].assists}\n`
	}

	queueFields.push(games)

	const profileEmbed = new MessageEmbed()
	.setColor('#FF0000')
	.setThumbnail(`https://opgg-static.akamaized.net/images/profile_icons/profileIcon${accountData.profileIconId}.jpg`)
	.setURL(`https://euw.op.gg/summoner/userName=${accountData.name.replaceAll(' ', '%20')}`)
	.setTitle(`${accountData.name}`)
	.addFields(queueFields)

	return profileEmbed
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profilelol')
		.setDescription('Affiche le profile d\'un joueur de LoL.')
		.addStringOption(
			option => option.setName('target')
			.setDescription("Le pseudo LoL du joueur.")
			.setRequired(true)
		),
	
	async execute(interaction, client) {
		
		interaction.reply('**Loading...**');

		const summonerName = interaction.options.getString('target')//.replaceAll(' ', '%20');
		
		const accountData = await getAccountID(
			summonerName, 
			'euw'
		);

		if (!accountData) {
			interaction.editReply(`**Le summoner ${summonerName} n'existe pas dans la région ${'euw'}**`)
			return;
		}

		console.log('acc data\n')
		console.log(accountData);

		const queueData = await getQueue(accountData.id, 'euw');
		
		// console.log('Q data\n')
		// console.log(queueData);

		const history = await getMatchHistory(accountData, 'europe', 5)
		
		// console.log('history\n')
		// console.log(history);
		  
		interaction.editReply( {embeds : [getProfileEmbed(accountData, queueData, history)] });
		
		interaction.editReply(`**Profil de ${accountData.name}**`);
	}
}