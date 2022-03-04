const { getActiveGames, deleteActiveGames } = require('../../assets/amongLegendGames');

module.exports = {
	data: {
		customId: 'cancelGame'
	},

	async execute(interaction, client) {

		game = getActiveGames(interaction.message.interaction.id);
		
		if (!game) {
			interaction.reply('The game is already canceled !')
			return;
		}

		if (interaction.user.id != game.owner) {
			interaction.reply('You ain\'t doin\' that ma boi!');
			return;
		}

		deleteActiveGames(interaction.message.interaction.id);
		interaction.message.delete();

		interaction.reply({content : 'Game canceled !', ephemeral : true})
	}
}