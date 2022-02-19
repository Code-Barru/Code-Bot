const { SlashCommandBuilder } = require('@discordjs/builders');
const { getActiveSong } = require('../../assets/musicQueue');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('shuffle')
		.setDescription('Shuffle the queue song.'),

	async execute(interaction, client) {

		const data = getActiveSong(interaction.guildId);

		var tmpQueue = data.queue;

		tmpQueue.shift();

		tmpQueue.sort(function() { return 0.5 - Math.random() });

		tmpQueue.unshift(data.queue[0]);

		data.queue = tmpQueue;

		interaction.reply('Shuffled queue !');
	}
}