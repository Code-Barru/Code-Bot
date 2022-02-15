const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
name: 'voiceStateUpdate',
async execute(oldState, newState) {
	if (!newState.channelId) {
		const connection = getVoiceConnection(newState.guild.id);
		if (connection) {
			connection.destroy();
		}

	}
}
}