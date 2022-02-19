const { getVoiceConnection } = require('@discordjs/voice');
const { deleteActiveSong } = require('../../assets/musicQueue');

module.exports = async function(interaction) {
	const connection = getVoiceConnection(interaction.guildId);
	if (connection) {
		connection.destroy();
		deleteActiveSong(interaction.guildId);
		interaction.reply('Leaved channel !')
		return
	}
	interaction.reply('Not connected to a voice channel !')
}