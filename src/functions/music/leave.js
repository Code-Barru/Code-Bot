const { getVoiceConnection } = require('@discordjs/voice');

module.exports = async function(interaction) {
	const connection = getVoiceConnection(interaction.guildId);
	if (connection) {
		connection.destroy();
		interaction.reply('Leaved channel !')
		return
	}
	interaction.reply('Not connected to a voice channel !')
}