const { SlashCommandBuilder } = require('@discordjs/builders');

const connectionSQL = require('../../bot');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('trackhere')
		.setDescription('Dis dans quel channel le tracking sera log.'),

	async execute(interaction, client) {

		await interaction.reply({content: '**Loading...**', ephemeral: true});

		//Pour send dans un channel 
		//await client.channels.cache.get(interaction.channelId).send("ça marche");
		
		connectionSQL.query('SELECT * FROM guildChannels WHERE guildID=?',
		[interaction.guildId],
		function(error,result,fields) {

			if (result.length == 0) {
				connectionSQL.query('INSERT INTO guildChannels (guildID, channelID) VALUES (?,?)',
				[interaction.guildId,interaction.channelId], 
				function(err,res,fields) {
					if (err) {
						console.log(err)
						return
					}

					interaction.editReply('Ce channel servira maintenant au log du tracking !')
				})

			} else if (result[0].channelID == interaction.channelId) {
				 interaction.editReply('Ce channel sert déjà au log du tracking !')
			} else {
				connectionSQL.query('UPDATE guildChannels SET channelID=? WHERE guildID=?',
				[interaction.channelId, interaction.guildId],
				function(err,res,fields) {
					if (err) {
						console.log(err)
						return;
					}
					interaction.editReply('Le channel de log du tracking a été changé !')
				})
			}
		})
	}
}