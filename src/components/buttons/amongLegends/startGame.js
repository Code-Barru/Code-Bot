const { MessageActionRow, MessageButton } = require('discord.js');
const { getActiveGames, getGameEmbed } = require('../../../assets/amongLegendGames');

module.exports = {
	data: {
		customId: 'startGame'
	},

	async execute(interaction, client) {

		game = getActiveGames(interaction.message.interaction.id);
		if (interaction.user.id != game.owner) {
			interaction.reply({
				content: 'You are not the owner of the game!',
				ephemeral: true
			});

			return;
		}
		if (game.gameStarted) {
			interaction.reply({
				content: 'The game has already started!',
				ephemeral: true
			});
			return;
		}

		
		game.gameStarted = true;
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('endGame')
					.setLabel('End Game')
					.setStyle('DANGER')
			)

		interaction.message.edit({embeds : [getGameEmbed(game)], components : [row]});
		interaction.reply({content: 'Game started', ephemeral : true});
	}
}