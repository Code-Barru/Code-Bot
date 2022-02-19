const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Resume the song.'),

	async execute(interaction, client) {

		interaction.reply('resume.');
	}
}