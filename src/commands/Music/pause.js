const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pause the song.'),
		

	async execute(interaction, client) {

		interaction.reply('pause');
	}
}