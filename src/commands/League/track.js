const { SlashCommandBuilder } = require('@discordjs/builders');
const getRiotAccount = require('../../functions/league/getRiotAccount');
const getQueue = require('../../functions/league/getQueue');
const connectionSQL = require('../../bot');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('track')
		.setDescription('Ajoute une personne au tracking.')
		.addStringOption(
			option => option.setName('compte')
			.setDescription('Le compte que tu veux track.')
			.setRequired(false)
		)
		.addUserOption(
			option => option.setName('personne')
			.setDescription('La personne que tu veux track')
			.setRequired(false)
		),
	
	async execute(interaction, client) {

		await interaction.reply('**Loading...**');

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
			interaction.editReply('Tu dois d\'abord définir un channel pour log les tracks (`/trackhere`).');
			return;
		}

		connectionSQL.query(`SELECT * FROM tracklol_${interaction.guildId} WHERE summonerName=?`,
		[summonerName], 
		async function(error, result, fields) {
			
			const accountData = await getRiotAccount(
				summonerName,
				'euw'
			);

			if (result.length != 0) {
				interaction.editReply(`Le joueur **${accountData.name}** est déjà tracké !`);
				return;
			}

			var queueData = await getQueue(
				accountData,
				'euw'
			);

			if (queueData.length == 0 ) {
				queueData = {
					queueType : 'RANKED_SOLO_5x5',
					tier: 'UNRANKED',
					rank: 'IV',
					leaguePoints: '0'
				};
			}

			for (var i=0 ; i < queueData.length ; i++) {
				if (queueData[i].queueType == 'RANKED_SOLO_5x5') {
					queueData = queueData[i];
					break;
				}
			}

			connectionSQL.query(`INSERT INTO tracklol_${interaction.guildId} VALUES (?,?,?,?,?,?)`,
			[accountData.name, accountData.id,accountData.puuid,queueData.tier,queueData.rank,queueData.leaguePoints],
			function(error2,result2,fields) {
				if (error2) {
					console.log('erreur')
					
					console.log(error)
					return;
				}
				interaction.editReply(`Le compte **${accountData.name}** a été ajouté au tracking !`)
			});
		});
	});
}
