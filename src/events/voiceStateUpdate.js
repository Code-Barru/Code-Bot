const { getVoiceConnection } = require('@discordjs/voice');
const { deleteActiveSong } = require('../assets/musicQueue');

module.exports = {
name: 'voiceStateUpdate',
async execute(oldState, newState) {

	console.log(newState);
	
	if (!newState.channelId && newState.id == process.env.CLIENT) {
		const connection = getVoiceConnection(newState.guild.id);
		if (connection) {
			connection.destroy();
			deleteActiveSong(newState.guild.id);
		}
	}
}
}