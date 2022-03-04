const { getActiveGames, deleteActiveGames } = require('../../../assets/amongLegendGames');

module.exports = {
	data: {
		customId: 'cancelGame'
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
		if (!game) {
			interaction.reply({
				content: 'The game is already canceled!',
				ephemeral: true
			})
			return;
		}

		deleteActiveGames(interaction.message.interaction.id);
		interaction.message.delete();

		interaction.reply({content : 'Game canceled !', ephemeral : true})
	}
}