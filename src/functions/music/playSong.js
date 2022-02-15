const { createAudioPlayer, createAudioResource, StreamType, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const { event } = require('../../assets/musicQueue');
const finishedSong = require('./finishedSong');

module.exports = async function(data, interaction) {

	let ressource = await createAudioResource(ytdl(data.queue[0].url), {
		inputType: StreamType.Arbitrary,
		inlineVolume: true
	});

	const player = createAudioPlayer();

	player.play(ressource);

	data.player = player;
	data.ressource = ressource;
	data.dispatcher = await data.connection.subscribe(player);
	data.dispatcher.guildId = data.guildId;

	if (data.queue[0].info.type === 'playlist') {
		event.emit('playList', data.queue[0].channel, data.queue[0].info.playlist, data.queue[0].info, data.queue[0].requester);
	} else {
		event.emit('playSong', data.queue[0].channel, data.queue[0].info, data.queue[0].requester);
	}

	player.on(AudioPlayerStatus.Idle, async () => {
		finishedSong(player, data.connection, data.dispatcher, interaction);
	})

	player.on('error', err => console.log(err));
}