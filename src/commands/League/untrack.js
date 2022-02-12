const { SlashCommandBuilder } = require('@discordjs/builders');
const connectionSQL = require('../../bot');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('untrack')
		.setDescription('Enlève une personne du tracking.')
		.addStringOption(
			option => option.setName('compte')
			.setDescription('Le compte que tu veux untrack.')
			.setRequired(false)
		)
		.addUserOption(
			option => option.setName('personne')
			.setDescription('La personne que tu veux untrack')
			.setRequired(false)
		),
	
	async execute(interaction, client) {

		await interaction.reply({content: '**Loading...**', ephemeral: true});

		var summonerName = interaction.options.getString('compte');
		var compteDiscord = interaction.options.getUser('personne');

		if (summonerName) {
			processTracking(summonerName,interaction);
			return;
		} 

		if (compteDiscord) {
			connectionSQL.query(`SELECT summonerName FROM accounts WHERE discordID=?`,[compteDiscord.id],
			function(err,res,fields) {
				if(err)
					console.log(err)
				
				if(res.length > 0)
					processTracking(res[0].summonerName, interaction)
				else 
					interaction.editReply(`Le compte ${compteDiscord.name} n'est pas enregistré !`)
				return;
			})
		}

		if (!compteDiscord && !summonerName) {
			connectionSQL.query(`SELECT summonerName FROM accounts WHERE discordID=?`,[interaction.user.id],
			function(err,res,fields) {
				if (err)
					console.log(err)
				
				if (res.length > 0)
					processTracking(res[0].summonerName, interaction)
				else	
					interaction.editReply(`Tu n'es pas enregistré et tu n'as pas donné de compte !`)
				
				return;
			});
		}
	}
}


async function processTracking(summonerName, interaction) {

	connectionSQL.query(`SELECT * FROM guildChannels WHERE guildID=?`,[interaction.guildId],
	function(error0,result0,fields) {
		
		//console.log(result0);
		if (result0.length == 0) {
			interaction.editReply('Tu dois d\'abord définir un channel pour log les tracks pour untrack (`/trackhere`).');
			return;
		}

		connectionSQL.query(`SELECT * FROM guildTrack WHERE summonerName=?`,
		[summonerName], 
		async function(error, result, fields) {

			if (result.length == 0) {
				interaction.editReply(`Le joueur **${result.summonerName}** n'est pas tracké !`);
				return;
			}

			connectionSQL.query(`DELETE FROM guildTrack WHERE summonerName=?`,
			[result[0].summonerName],
			function(error2,result2,fields) {
				if (error2) {
					console.log('erreur')
					
					console.log(error)
					return;
				}
				interaction.editReply(`Le compte **${result[0].summonerName}** a été enlevé du tracking !`)
			});
		});
	});
}
