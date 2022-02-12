const { SlashCommandBuilder } = require('@discordjs/builders');
const connectionSQL = require('../../bot');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tracklist')
		.setDescription('Affiche la liste des comptes track.'),
	
	async execute(interaction,client) {
		
		await interaction.reply('**Loading...**');

		connectionSQL.query(`SELECT summonerName FROM guildTrack WHERE guildID=?`,
		[interaction.guildId],
		function(error,result,fields) {
			if (error) {
				console.log(error);
				interaction.editReply('Il y a eu une erreur !');
				return;
			}

			if (result.length==0) {
				interaction.editReply('Aucun joueur n\'est track sur ce serveur !');
				return;
			}

			var str = 'Liste des joueurs tracks :\n'

			result.forEach(name => {
				str += `**${name.summonerName}**\n`;
			});

			interaction.editReply(str);
		})
	}
}