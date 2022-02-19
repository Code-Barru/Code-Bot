const { SlashCommandBuilder } = require('@discordjs/builders');
const { getActiveSong } = require('../../assets/musicQueue');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clearq')
		.setDescription('Clear the song queue.'),
		

	async execute(interaction, client) {

		const data = getActiveSong(interaction.guildId);

		var newQueue = [data.queue[0]];

		data.queue = newQueue;

		interaction.reply('Cleared queue.');
	}
}