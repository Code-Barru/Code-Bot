const { getActiveSong } = require('../../../assets/musicQueue');
const { MessageActionRow, MessageButton, MessageEmbed} = require('discord.js')

module.exports = {
	data: {
		customId : 'nextPage'
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

		const embed = new MessageEmbed()
			.setTitle(`Queue`)
			.setColor('#6987C9')

		if (data.queue[data.currentSong].info.playlist)
			embed.setThumbnail(data.queue[data.currentSong].info.playlist.thumbnail);
		else
			embed.setThumbnail(data.queue[data.currentSong].info.thumbnail);

		embed.addField('Currently playing', `[${data.queue[data.currentSong].info.title}](${data.queue[data.currentSong].info.url})`);

		var infos = `:repeat: Repeat : ${data.repeat}\n`

		if (data.queue.length > 10) {
			infos += `:musical_note: Number of song in queue : ${data.queue.length-1}`
		}

		embed.addField('Infos', infos)
		
		if (data.queue.length > 1 ) {
			upNext = ''

			data.queueMessage.offset += 5

			for (var i = data.queueMessage.offset - 5 ; i < Math.min(data.queue.length, data.queueMessage.offset) ; i++) {
				
				upNext += `\n\`${i}\`[${data.queue[i].info.title}](${data.queue[i].info.url})`
			}
			embed.addField(':arrow_down: Up Next :arrow_down:', upNext)
		}
		else 
			embed.addField(':x: The queue is empty :x:', 'No songs to display !')

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('prevPage')
					.setLabel('Previous Page')
					.setStyle('SECONDARY')
					.setDisabled(false),
				new MessageButton()
					.setCustomId('nextPage')
					.setLabel('Next Page')
					.setStyle('SECONDARY')
					.setDisabled(data.queueMessage.offset >= data.queue.length),
			)

		await interaction.update({
			embeds: [embed],
			components: [row]
		});
	}
}