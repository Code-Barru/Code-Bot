const { SlashCommandBuilder } = require('@discordjs/builders');

const getRiotAccount = require('../../functions/league/getRiotAccount');
const connectionSQL = require('../../bot');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Associe ton compte discord à un compte LoL.')
		.addStringOption(
			option => option.setName('compte')
			.setDescription('Ton pseudo LoL.')
			.setRequired(true)
		),
	
	async execute(interaction, client) {

		const summonerName = interaction.options.getString('compte');

		const accountData = await getRiotAccount(
			summonerName,
			'euw'
		);

		await interaction.reply('**Loading...**');

		if (!accountData) {
			await interaction.editReply(`**Le summoner ${summonerName} n'existe pas dans la région ${'euw'}**`)
			return;
		}

		connectionSQL.query('SELECT * FROM accounts WHERE discordID=?;',[interaction.user.id], function(error, res, fields) {
			if (error) {
				console.log(error);
				return
			}
				if (res.length == 0) {
					connectionSQL.query('INSERT INTO accounts (discordID, summonerName, summonerID, summonerPUUID) VALUES (?,?,?,?);',
					[interaction.user.id, accountData.name, accountData.id, accountData.puuid], 
					function(error, res2, fields) {
						if (error) {
							console.log(error);
							return;
						}
						interaction.editReply(`Le compte **${accountData.name}** a été associé à ton compte !`);
						//console.log(res2);
						return;
						
				});
			}
				else {
					interaction.editReply(`Tu as déjà le compte **${res[0].summonerName}** associé à ton compte.`);
					return;
				}
		})
	}
}