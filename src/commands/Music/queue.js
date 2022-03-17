const { SlashCommandBuilder, } = require('@discordjs/builders');
const { getActiveSong } = require('../../assets/musicQueue');
const sendQueueEmbed = require('../../functions/music/sendQueueEmbed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Display the queue'),
	
	async execute(interaction, client) {
		
		data = getActiveSong(interaction.guildId);

		if (!data || !data.queue) {
			interaction.reply({
				content: 'The queue is empty or I am not connected to a Voice Channel.',
				ephemeral: true
			});
			return;
		}

		if (data.queueMessage) {
			data.queueMessage.delete();
		}

		data.queueMessage = {
			offset : Math.min(data.queue.length, 6)
		}
		await sendQueueEmbed(null, data, interaction);
	}
}