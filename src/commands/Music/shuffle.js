const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shuffle')
		.setDescription('Shuffle the queue song.'),

	async execute(interaction, client) {

		interaction.reply('shuffle.')
	}
}