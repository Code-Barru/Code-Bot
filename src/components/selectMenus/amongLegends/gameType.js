const { MessageActionRow, MessageButton } = require("discord.js");
const { getGameEmbed, getActiveGames } = require('../../../assets/amongLegendGames');

module.exports = {
	data: {
		customId: 'gameType'
	},

	async execute(interaction, client) {
		const game = getActiveGames(interaction.message.interaction.id);

		if (interaction.user.id != game.owner) {
			interaction.reply({
				contenct: 'You are not the owner of the game!',
				ephemeral: true
			});
			return;
		}

		if (game.gameType) {
			interaction.reply({
				content: 'The gamemode has already been selected !',
				ephemeral: true
			});
			return;
		}

		game.gameType = interaction.values[0];
		
		const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setCustomId(`startGame`)
				.setLabel('Start Game')
				.setStyle('SUCCESS'),
			new MessageButton()
				.setCustomId(`cancelGame`)
				.setLabel('Cancel Game')
				.setStyle('DANGER')
		)
		
		interaction.reply({
			content: 'Gamemode Selected !',
			ephemeral: true
		});

		interaction.message.edit({
			content: '',
			components: [row],
			embeds: [getGameEmbed(game)]
		});
	}
}