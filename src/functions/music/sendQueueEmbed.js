const { MessageActionRow, MessageButton, MessageEmbed} = require('discord.js');


function getDisabledArray(buttonId, offset, queueLength) {
	
	var disabledArray = [
		false, 	// first & previous page
		false, 	// next & last page
	]

	switch(buttonId) {
		case 'firstPage': {
			disabledArray[0] = true; //first page & previous button disabled
			break;
		}
		case 'prevPage' : {
			disabledArray[0] = (offset == 6) //if on 1st page => first page & previous button disabled
			break;
		}
		case 'nextPage' : {
			disabledArray[1] = (offset >= queueLength); //if on last page => last page & next button disabled
			break;
		}
		case 'lastPage' : {
			disabledArray[1] = true; //last page & next button disabled
			break;
		}
		default : {
			disabledArray[0] = true;
		}
	}
	return disabledArray
}

function getActionRow(disabledArray) {

	return new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setCustomId('firstPage')
				.setLabel('First Page')
				.setStyle('PRIMARY')
				.setDisabled(disabledArray[0]),
			new MessageButton()
				.setCustomId('prevPage')
				.setLabel('Previous Page')
				.setStyle('SECONDARY')
				.setDisabled(disabledArray[0]),
			new MessageButton()
				.setCustomId('nextPage')
				.setLabel('Next page')
				.setStyle('SECONDARY')
				.setDisabled(disabledArray[1]),
			new MessageButton()
				.setCustomId('lastPage')
				.setLabel('Last Page')
				.setStyle('PRIMARY')
				.setDisabled(disabledArray[1])
		)
}

module.exports = async function(buttonId, data, interaction) {
	const embed = new MessageEmbed()
			.setTitle(`Queue`)
			.setColor('#6987C9')

	if (data.queue[data.currentSong].info.playlist) {
		embed.setThumbnail(data.queue[data.currentSong].info.playlist.thumbnail);
	} else {
		embed.setThumbnail(data.queue[data.currentSong].info.thumbnail);
	}
		
	embed.addField('Currently playing', `[${data.queue[data.currentSong].info.title}](${data.queue[data.currentSong].info.url})`);

	var infos = `:repeat: Repeat : ${data.repeat}\n`
	if (data.queue.length > 5) {
		infos += `:musical_note: Number of song in queue : ${data.queue.length-1}`
	}
	embed.addField('Infos', infos)

	if (data.queue.length > 1 ) {
		var upNext = '';

		for (var i = data.queueMessage.offset - 5 ; i < Math.min(data.queue.length, data.queueMessage.offset) ; i++) {
			upNext += `\n\`${i}\`[${data.queue[i].info.title}](${data.queue[i].info.url})`
		}
		embed.addField(':arrow_down: Up Next :arrow_down:', upNext)
	}
	else {
		embed.addField(':x: The queue is empty :x:', 'No songs to display !')
	}

	row = getActionRow(getDisabledArray(buttonId, data.queueMessage.offset, data.queue.length))

	if (buttonId === null) {
		await interaction.reply({
			embeds: [embed],
			components: [row]
		});

		data.queueMessage = await interaction.fetchReply();
		data.queueMessage.offset = 6;
	} else {
		await interaction.update({
			embeds: [embed],
			components: [row]
		});
	}
}