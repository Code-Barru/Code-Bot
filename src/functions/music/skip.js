const { getActiveSong, hasActiveSong } = require('../../assets/musicQueue');
const { finishedSong } = require('./playSong');

async function skip(interaction) {
	const data = getActiveSong(interaction.guildId);

	if (!hasActiveSong(interaction.guildId) || !data.connection || !data.player) {
		interaction.reply({
			content: 'There is no music playing on the server.',
			ephemeral: true
		});
		return;
	}
	
	finishedSong(data.player, data.connection, data.dispatcher, interaction);
	await interaction.reply({
		content: `Skipped **${data.queue[data.currentSong].info.title}**.`,
		ephemeral: true
	});
}

module.exports.skip = skip;