const EventEmitter = require("events");

const { MessageEmbed } = require('discord.js');

const activeSongs = new Map();
const event = new EventEmitter

var playingPlaylist = false;

exports.getActiveSong = (guildId) => {
	return activeSongs.get(guildId);
};

exports.deleteActiveSong = (guildId) => {
	try {
		activeSongs.delete(guildId);
		return true;
	} catch {
		return false;
	}
}

exports.setActiveSong = (guildId, data) => {
	try {
		activeSongs.set(guildId, data);
		return true;
	} catch (err) {
		return false;
	}
};

exports.hasActiveSong = (guildId) => {
	return activeSongs.has(guildId);
};

event.addListener('addSong', async function(interaction, queueSongInfo) {
	await interaction.editReply(`Added **${queueSongInfo.title}** to queue.`)
});

event.addListener('addList', async function(interaction, playlistInfo) {
	await interaction.editReply(`Added playlist **${queueSongInfo.playlist.title}** to queue.`);
});

async function getSongEmbed(song, requester) {

	return new MessageEmbed()
		.setColor('#6987C9')
		.setAuthor({name: requester.username, iconURL: requester.displayAvatarURL()})
		.setTitle(song.info.title)
		.setURL(song.url)
		.setThumbnail(song.info.thumbnail)
}

event.addListener('playSong', async function(data) {
	playingPlaylist = false;

	const message = data.message;
	const requester = data.queue[data.currentSong].requester;
	const channel = data.queue[data.currentSong].channel;

	embed = await getSongEmbed(data.queue[data.currentSong], requester)

	if (!data.message) {
		data.channel = channel;
		data.message = await data.channel.send({ embeds : [embed] });
	}
	else {
		data.message.delete();
		data.message = await channel.send({ embeds: [embed] });
	}
})

async function getPlaylistEmbed(song, requester) {
	return new MessageEmbed()
		.setColor('#6987C9')
		.setAuthor({name: requester.username, iconURL: requester.displayAvatarURL()})
		.setTitle(song.info.playlist.title)
		.setURL(song.info.playlist.url)
		.setThumbnail(song.info.playlist.thumbnail)
		.addField('Playing', song.info.title)
}


event.addListener('playList', async function(data) {
	playingPlaylist = true;

	const requester = data.queue[data.currentSong].requester;
	const channel = data.queue[data.currentSong].channel;

	embed = await getPlaylistEmbed(data.queue[data.currentSong], requester);

	if (!data.message) {
		data.channel = channel;
		data.message = await data.channel.send({ embeds : [embed] });
	}
		
	else {
		data.message.delete();
		data.message = await channel.send({ embeds: [embed] });
	}
		

})

event.addListener('finished', async function(finishChannel, playingSong) {
	console.log(finishChannel);
})

module.exports.event = event;