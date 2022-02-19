const { SlashCommandBuilder } = require('@discordjs/builders');
const { skip } = require('../../functions/music/skip');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skip to the next song.'),

	async execute(interaction, client) {

		interaction.reply('skip.');
	}
}