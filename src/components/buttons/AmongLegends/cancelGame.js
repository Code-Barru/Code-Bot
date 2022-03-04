const { getActiveGames, deleteActiveGames } = require('../../../assets/amongLegendGames');

module.exports = {
	data: {
		customId: 'cancelGame'
	},

	async execute(interaction, client) {

		game = getActiveGames(interaction.message.interaction.id);
		
		if (!game) {
			interaction.reply('The game is already canceled!')
			return;
		}

		if (interaction.user.id != game.owner) {
			interaction.reply('You are not the owner of the game!');
			return;
		}

		deleteActiveGames(interaction.message.interaction.id);
		interaction.message.delete();

		interaction.reply({content : 'Game canceled !', ephemeral : true})
	}
}