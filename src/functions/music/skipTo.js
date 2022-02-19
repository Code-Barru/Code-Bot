const { getActiveSong } = require('../../assets/musicQueue');
const { finishedSong } = require('./playSong');

function skipTo(interaction, songNumber) {

	const data = getActiveSong(interaction.guildId);

	if (songNumber >= data.queue.length) {
		interaction.reply('The number is greater than the number of enqueued songs.');
		return;
	}

	tmpQueue = [];

	for (var i=songNumber-1 ; i < data.queue.length ; i++) {
		tmpQueue.push(data.queue[i]);
	}

	data.queue = tmpQueue;
	data.currentSong = 0;
	finishedSong(data.player, data.connection, data.dispatcher, interaction);

	interaction.reply(`Skipped to **${data.queue[data.currentSong+1].info.title}**`);
}


module.exports.skipTo = skipTo;