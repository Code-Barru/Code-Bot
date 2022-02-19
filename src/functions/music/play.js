const { getActiveSong, setActiveSong, event } = require('../../assets/musicQueue');
const connectToChannel = require('./connectToChannel');
const { playSong } = require('./playSong')
const { searchPlaylist, search } = require('./youtubeSearch');

async function enqueue(data, interaction) {
	if(!data.dispatcher) {
        await playSong(data, interaction);
    } 
	setActiveSong(interaction.guildId, data);
}

async function enqueuePlaylist(data, interaction, playlist) {
	songNumber = 0;

	for (const song of playlist.items) {
		await enqueueSong(data, interaction, song, true, playlist, songNumber++);
	}
	event.emit('addList', interaction, playlist);
}

async function enqueueSong(data, interaction, song, isPlaylist, playlist) {
	if (isPlaylist) {
		queueSongInfo = {
			title: song.snippet.title,
			description: song.snippet.description,
			author: song.snippet.channelTitle,
			url: `https://www.youtube.com/watch?v=${song.snippet.resourceId.videoId}`,
			thumbnail: null,
			type: 'playlist',
			songNumber: songNumber,
			playlist: {
				title: playlist.snippet.title,
				thumbnail: playlist.snippet.thumbnails.high.url,
				author: playlist.snippet.channelTitle,
				songNumber: playlist.items.length,
				url: `https://www.youtube.com/playlist?list=${playlist.id.videoId}`
			}
		};
	} else {
		queueSongInfo = {
			title: song.snippet.title,
			description: song.snippet.description,
			author: song.snippet.channelTitle,
			url: `https://www.youtube.com/watch?v=${song.id.videoId}`,
			thumbnail: song.snippet.thumbnails.high.url,
			type: 'video',
			playlist: null
		};
	}
	await data.queue.push({
		info: queueSongInfo,
		requester: interaction.user,
		url: queueSongInfo.url,
		channel: interaction.channel,
	});

	await enqueue(data, interaction);
	
	if(!isPlaylist){
		event.emit('addSong', interaction, queueSongInfo);
	}
}


module.exports = async function(options) {
	
	const { interaction, song } = options
	const data = getActiveSong(interaction.guildId) || {};

	if (!interaction.guild.me.voice.channel) 
		data.connection = await connectToChannel(interaction);
		
	if (!data.connection) 
		data.connection = await connectToChannel(interaction);

	if (!data.queue) data.queue = [];
	if (!data.repeat) data.repeat = false;

	data.guildId = interaction.guildId;

	searchR = await search(song, 1);
	items = searchR.items;

	if ( searchR.pageInfo.totalResults == 0 ) {
		interaction.editReply('Didn\'t find anything, either bad link or the link isn\'t accessible.');
		return;
	}
	
	if (searchR.items[0].id.kind === 'youtube#playlist') {
		var playlist = await searchPlaylist(searchR.items[0].id.playlistId, 50);
		var nextPageToken = playlist.nextPageToken;
		var compteur = 50;

		do {
			tmp = await searchPlaylist(searchR.items[0].id.playlistId, 50, nextPageToken);
			nextPageToken = tmp.nextPageToken;
			for (const video of tmp.items) {
				playlist.items.push(video)
			}

			compteur += 50;
		} while (compteur < playlist.pageInfo.totalResults);
		playlist.id = searchR.items[0].id;
		playlist.snippet = searchR.items[0].snippet;

		await enqueuePlaylist(data,interaction,playlist);
		return;
	} 
	await enqueueSong(data,interaction, searchR.items[0], false);
	return;
}