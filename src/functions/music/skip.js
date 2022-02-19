const { getActiveSong, hasActiveSong } = require('../../assets/musicQueue');
const { data } = require('../../commands/Music/repeat');
const { finishedSong } = require('./playSong');

async function skip(interaction) {
	data = getActiveSong(interaction.guildId);

	if (!hasActiveSong(interaction.guildId) || data.connection || data.player) {
		interaction.reply('There is no music playing on the server.');
		return;
	}
	
	finishedSong(data.player, data.connection, data.dispatcher, interaction);
}


module.exports.skip = skip;