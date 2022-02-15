const { getActiveSong, setActiveSong, event } = require('../../assets/musicQueue');
const connectToChannel = require('./connectToChannel');
const playSong = require('./playSong')
const ytdl = require('ytdl-core');
const yts = require('yt-search');

module.exports = async function(options) {
	
	const { interaction, channel, song } = options
	const data = getActiveSong(interaction.guildId) || {};

	if (!interaction.guild.me.voice.channel)
		data.connection = await connectToChannel(interaction);

	if (!data.connection)
		data.connection = await connectToChannel(interaction);
	
	if (!data.queue) data.queue = [];
	if (!data.repeat) data.repeat = false;

	data.guildId = interaction.guildId;

	let queueSongInfo;
	const songInfo = (await yts(song)).all.filter(ch => ch.type === 'video' || ch.type ==='list')[0];
	
	if(songInfo.type === 'list') {
		const playlisSongs = (await yts({listId: songInfo.id}));
		
		for (const video of playlisSongs.videos) {
			const ytdlSongInfo = await ytdl.getInfo(video.videoId);

			queueSongInfo = {
				title: video.title,
				description: ytdlSongInfo.videoDetails.description,
				duration: video.duration.duration,
				author: video.author.name,
				url: ytdlSongInfo.videoDetails.video_url,
				thumbnail: video.thumbnail,
				type: 'playlist',
				playlist: playlisSongs
			};

			await data.queue.push({
				info: queueSongInfo,
				requester: interaction.user,
				url: ytdlSongInfo.videoDetails.video_url,
				channel: interaction.channel
			});
		};
	} else {
		const ytdlSongInfo = await ytdl.getInfo(songInfo.url);

		queueSongInfo = {
			title: songInfo.title,
			description: ytdlSongInfo.videoDetails.description,
			duration: songInfo.duration.duration,
			author: songInfo.author.name,
			url: ytdlSongInfo.videoDetails.video_url,
			thumbnail: songInfo.thumbnail,
			type: 'video',
			playlist: null
		};
		await data.queue.push({
			info: queueSongInfo,
			requester: interaction.user,
			url: songInfo.url,
			channel: interaction.channel
		});
	};

	if(!data.dispatcher) {
		playSong(data, interaction);
	} else {

		if (queueSongInfo.type === 'playlist') {
			event.emit('addList', interaction.channel, queueSongInfo.playlist, interaction.user);
		} else {
			event.emit('addSong', interaction.channel, queueSongInfo, interaction.user);
		}
	};

	setActiveSong(interaction.guildId, data);
}