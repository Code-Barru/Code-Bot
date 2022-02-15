const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = async function(interaction) {
	
	const voiceState = interaction.member.voice

	connection = joinVoiceChannel({
		channelId: voiceState.channelId,
		guildId: interaction.guildId,
		adapterCreator: voiceState.guild.voiceAdapterCreator,
		selfDeaf: false
	});


	return connection;
}