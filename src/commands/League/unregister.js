const { SlashCommandBuilder } = require('@discordjs/builders');

const connectionSQL = require('../../bot');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('unregister')
		.setDescription('Enlève l\'association du compte LoL à ton compte discord.'),
	
	async execute(interaction, client) {
		
		await interaction.reply({content: '**Loading...**', ephemeral: true});

		connectionSQL.query('SELECT * FROM accounts WHERE discordID=?',
		[interaction.user.id],
		 
		function(error,result,fields) {

			if (result.length >= 1) {
				connectionSQL.query('DELETE FROM accounts WHERE discordID=?',
				[interaction.user.id], 

				function(err,res, fields) {
					if (err) {
						console.log(err);
						interaction.editReply('Il y a eu un problème !');
						return;
					}

					interaction.editReply(`Le compte **${result[0].summonerName}** n'est plus associé à ton compte !`);
					return;
				})
			}
			else {
				interaction.editReply('Tu n\'as pas de compte LoL associé à ton compte discord !');
			}
		});
	}
}