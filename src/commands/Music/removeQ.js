const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove')
		.setDescription('Remove a song from the queue.')
		.addNumberOption(option => 
			option.setName('song_number')
				.setDescription('The number of the song you want to remove.')
				.setRequired(true)),
		

	async execute(interaction, client) {

		const number = interaction.options.getNumber('song_number');

		interaction.reply(`removeQ ${number}`);
	}
}