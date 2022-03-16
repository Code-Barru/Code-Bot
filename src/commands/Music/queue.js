const { SlashCommandBuilder, } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const { getActiveSong } = require('../../assets/musicQueue');


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
			infos += `:musical_note: Number of song : ${data.queue.length}`
		}

		embed.addField('Infos', infos)
		
		if (data.queue.length > 1 ) {
			upNext = ''
			
			for (var i = (data.repeat) ? 0 : 1 ; i < Math.min(data.queue.length, 11) ; i++) {
				
				upNext += `\n\`${i}\`[${data.queue[i].info.title}](${data.queue[i].info.url})`
			}
			embed.addField(':arrow_down: Up Next :arrow_down:', upNext)
		}

		else 
			embed.addField(':x: The queue is empty :x:', 'No songs to display !')
		if (data.queueMessage) {
			data.queueMessage.delete();
		}

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('prevPage')
					.setLabel('Previous Page')
					.setStyle('SECONDARY')
					.setDisabled(true),
				new MessageButton()
					.setCustomId('nextPage')
					.setLabel('Next Page')
					.setStyle('SECONDARY'),
			)

		await interaction.reply({
			embeds: [embed],
			components: [row]
		});

		const message = await interaction.fetchReply();

		if (data.queue.length > 10)
			message.offset = Math.min(data.queue.length, 11);

		data.queueMessage = message;
	}
}