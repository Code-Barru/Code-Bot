const { getActiveSong } = require('../../../assets/musicQueue');
const sendQueueEmbed = require('../../../functions/music/sendQueueEmbed');

module.exports = {
	data: {
		customId: 'firstPage'
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
		data.queueMessage.offset = 6;

		sendQueueEmbed(this.data.customId, data, interaction)
	}
}