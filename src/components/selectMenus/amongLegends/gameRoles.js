const { MessageActionRow, MessageSelectMenu } = require("discord.js");
const {  getActiveGames } = require('../../../assets/amongLegendGames');


module.exports = {
	data: {
		customId : 'gameRoles'
	},

	async execute(interaction, client) {
		
		game = getActiveGames(interaction.message.interaction.id);

		if (interaction.user.id != game.owner) {
			interaction.reply({
				content: 'You are not the owner of the game!',
				ephemeral: true
			})
		}
		if (game.roles) {
			interaction.reply({
				content: 'Roles have already been selected!',
				ephemeral: true
			})
		}

		const row = new MessageActionRow()
		.addComponents(
			new MessageSelectMenu()
				.setCustomId('gameType')
				.setPlaceholder('No game mode selected.')
				.addOptions([
					{
						label: 'ARAM',
						description: 'ARAM Gamemode',
						value: 'ARAM'
					},
					{
						label: 'Summoner\'s Rift',
						description: 'Summoner\'s Rift Gamemode',
						value: 'Sumoner\'s Rift'
					}
				])
		)

		interaction.reply({
			content: 'Roles selected !',
			ephemeral: true
		})

		interaction.message.edit({
			components: [row]
		});
	}
}