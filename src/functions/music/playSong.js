const { createAudioPlayer, createAudioResource, StreamType, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const { event, getActiveSong, setActiveSong, deleteActiveSong } = require('../../assets/musicQueue');

async function playSong(data, interaction) {
	let ressource = await createAudioResource(ytdl(data.queue[data.currentSong].url, {quality: 'highestaudio'}), {
		inputType: StreamType.Arbitrary,
		inlineVolume: true
	});

	const player = createAudioPlayer();

	player.play(ressource);

	data.player = player;
	data.ressource = ressource;
	data.dispatcher = await data.connection.subscribe(player);
	data.dispatcher.guildId = data.guildId;
	data.playingSong = data.queue[data.currentSong];

	if (data.queue[data.currentSong].info.type === 'playlist') {
		event.emit('playList', data);
	} else {
		event.emit('playSong', data);
	}

	player.on(AudioPlayerStatus.Idle, async () => {
		finishedSong(player, data.connection, data.dispatcher, interaction);
	})

	player.on('error', err => console.log(err));
}

async function finishedSong(player, connection, dispatcher, interaction) {

	const fetchedData = await getActiveSong(dispatcher.guildId);

	if (fetchedData?.repeat === 'song') 
		return playSong(fetchedData, interaction);

	if (fetchedData?.repeat === 'queue' && fetchedData?.currentSong == fetchedData?.queue.length - 1) {
		fetchedData.currentSong = 0;
		return playSong(fetchedData, interaction);
	}

	if (fetchedData.repeat === 'queue')
		fetchedData.currentSong++;
	else {
		fetchedData.queue.shift();
	}

	if(fetchedData.queue.length > fetchedData.currentSong) {
		setActiveSong(interaction.guildId, fetchedData);
		playSong(fetchedData, interaction);
	} else {
		event.emit('finish', interaction.channel);
		deleteActiveSong(interaction.guildId);
		player.stop();
		connection.destroy();
	};
};

module.exports.playSong = playSong;
module.exports.finishedSong = finishedSong;