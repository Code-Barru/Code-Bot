const { SlashCommandBuilder } = require('@discordjs/builders');
const { skipTo } = require('../../functions/music/skipTo');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('skipto')
		.setDescription('Skip to the next song.')
		.addNumberOption(option => 
			option.setName('song_number')
				.setDescription('The number of the song you want to skip to.')
				.setRequired(true)),

	async execute(interaction, client) {

		const number = interaction.options.getNumber('song_number');

		skipTo(interaction, number);
	}
}