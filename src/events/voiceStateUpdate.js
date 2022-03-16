const { getVoiceConnection } = require('@discordjs/voice');
const { deleteActiveSong, getActiveSong } = require('../assets/musicQueue');

module.exports = {
	name: 'voiceStateUpdate',
	async execute(oldState, newState) {

		const connection = getVoiceConnection(newState.guild.id);

		if (!connection)
			return;

		if (!newState.channelId && newState.id == process.env.CLIENT) {
			connection.destroy();
			deleteActiveSong(newState.guild.id);
		}
	}
}