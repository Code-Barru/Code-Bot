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

	const accountData = await getRiotAccount(summonerName, 'euw');
	
	var queueData = await getQueue(accountData, 'euw');

	for (var i=0 ; i < queueData.length ; i++) {
		if (queueData[i].queueType == 'RANKED_SOLO_5x5') {
			queueData = queueData[i]
		}
	}

	if (queueData.length==0) {
		queueData = {tier: 'UNRANKED', rank: null, leaguePoints: null}
	}

	connectionSQL.query(`SELECT * FROM guildTrack WHERE summonerName=? AND guildID=?`,
	[accountData.name, interaction.guildId],async function(err,res,f) {
		
		if (err) {
			console.log(err)
			return;
		}

		if (res.length == 0 )

			connectionSQL.query(`INSERT guildTrack SET summonerName=?, guildID=?`,
			[accountData.name, interaction.guildId],
			function(error, result, fields) {
				if (error) {
					console.log(error);
					return;
				}
				
				if (result.affectedRows == 1) {
					interaction.editReply(`Le compte **${accountData.name}** a été ajouté au tracking !`)
							

					connectionSQL.query(`INSERT IGNORE lolplayers SET summonerName=?, summonerID=?,summonerPUUID=?`,
					[accountData.name, accountData.id, accountData.puuid],
					function(error0,result0,fields0) {
						if(error0) {
							console.log(error0)
							return;
						}
						if (result0.affectedRows == 1) {
							
							connectionSQL.query(`SELECT ID FROM lolplayers WHERE summonerName=?`,
							[accountData.name], 
							function(error1, result1, fields1) {
								if (error1) {
									console.log(error1);
									return;
								}
								connectionSQL.query(`CREATE TABLE lolplayers_${result1[0].ID} (
									query_date timestamp default current_timestamp not null, 
									TIER VARCHAR(10), 
									\`RANK\` VARCHAR(5), 
									LPs int 
								)`, function(error2, result2, fields2) {
									if (error2) {
										console.log(error2)
										return;
									}
									connectionSQL.query(`INSERT INTO lolplayers_${result1[0].ID} (TIER,\`RANK\`,LPs) VALUES (?,?,?)`,
									[queueData.tier, queueData.rank, queueData.leaguePoints], 
									function(error3, result3, fields3) {
										if (error3) {
											console.log(error3);
											return;
										}

									})
								})
							})
						}
					})
				}
				else 
					interaction.editReply(`Le compte **${accountData.name}** est déjà dans le tracking !`)
			})
	
			
		else
			await interaction.editReply(`Le compte **${accountData.name}** est déjà dans le tracking !`);
	})
}
