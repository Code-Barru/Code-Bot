const { SlashCommandBuilder } = require('@discordjs/builders');
const { getActiveSong } = require('../../assets/musicQueue');


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

		const data = getActiveSong(interaction.guildId);

		if (number >= data.queue.length) {
			interaction.reply('The number is greater than the number of song in the queue !');
			return;
		}

		interaction.reply(`Remove **${data.queue[number].info.title}** from the queue !`)
		data.queue.splice(number, 1);
		
	}
}