const { processEndGame } = require("../../../functions/AmongLegends/processEndGame");
const { getGameEmbed, getActiveGames } = require("../../../assets/amongLegendGames");


module.exports = {
	data: {
		customId: 'endGame'
	},

	async execute(interaction, client) {


		game = getActiveGames(interaction.message.interaction.id);
		
		if (game.gameEnded) {
			interaction.reply({
				content: 'The game has already ended!',
				ephemeral: true
			});
			return;
		}

		if (interaction.user.id != game.owner) {
			interaction.reply({
				content: 'You are not the owner of the game!',
				ephemeral: true
			});

			return;
		}

		game.gameEnded = true;
		

		interaction.message.edit(
			{embeds: [getGameEmbed(game)],
			components: []
		});

		

		processEndGame(game);

		interaction.reply({
			content: 'Waiting for people to answer the bot.', 
			ephemeral: true
		});
	}
}