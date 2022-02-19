const { SlashCommandBuilder } = require('@discordjs/builders');
const { changeRepeat } = require('../../functions/music/changeRepeat');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('repeat')
		.setDescription('Repeat the queue/current song.')
		.addStringOption(option => 
			option.setName('category')
				.setDescription('Song or Queue.')
				.setRequired(true)
				.addChoice('Queue','queue')
				.addChoice('Song', 'song')),
	async execute(interaction, client) {

		const category = interaction.options.getString('category');

		reponse = changeRepeat(interaction, category);

		if (!reponse) {
			interaction.reply('I\'m not connected or playing music !');
			return;
		}

		interaction.reply(`Repeat setting set to **${reponse}**.`);
	}
}