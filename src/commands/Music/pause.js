const { SlashCommandBuilder } = require('@discordjs/builders');
const { getActiveSong, hasActiveSong } = require('../../assets/musicQueue');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pause/unpause the bot.'),
	
	async execute(interaction, client) {
		data = getActiveSong(interaction.guildId);

		if (!hasActiveSong(interaction.guildId) || !data.connection || !data.player) {
			interaction.reply('There is no song playing in the server.');
			return;
		}

		if (data.player.state.status == 'playing') {
			data.player.pause();
			interaction.reply('Bot paused.')
			return;
		}

		if (data.player.state.status == 'paused') {
			data.player.unpause();
			interaction.reply('Bot unpaused.')
			return;
		}
	}
}