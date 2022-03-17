const { getActiveSong } = require('../../../assets/musicQueue');
const sendQueueEmbed = require('../../../functions/music/sendQueueEmbed');

module.exports = {
	data: {
		customId: 'lastPage'
	},

	async execute(interaction, client) {

		const data = getActiveSong(interaction.guildId);

		if (!data.queueMessage) {
			await interaction.reply({
				content: 'An error occured, you don\'t have a queue message !',
				ephemeral: true
			});
			return;
		}

		var tmp = data.queue.length

		while( tmp % 5 != 1 )
			tmp++;

		data.queueMessage.offset = tmp ;

		sendQueueEmbed(this.data.customId, data, interaction);
	}
}