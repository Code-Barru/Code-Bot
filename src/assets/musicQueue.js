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
	await interaction.editReply(`Added **${queueSongInfo.title}** by **${queueSongInfo.author}** to queue.`)
});

event.addListener('addList', async function(interaction, playlistInfo) {
	await interaction.editReply(`Added playlist **${queueSongInfo.playlist.title}** by **${queueSongInfo.playlist.author}** to queue.`);
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
	const requester = data.queue[0].requester;
	const channel = data.queue[0].channel;

	embed = await getSongEmbed(data.queue[0], requester)

	if (!message) {
		data.message = await channel.send({embeds : [embed]});
	} else {
		await data.message.edit({ embeds: [embed]});
	}
})

async function getPlaylistEmbed(song, requester) {
	return new MessageEmbed()
		.setColor('#6987C9')
		.setAuthor({name: requester.username, iconURL: requester.displayAvatarURL()})
		.setTitle(song.info.playlist.title)
		.setURL(song.info.playlist.url)
		.setThumbnail(song.info.playlist.thumbnail)
		.addField(song.info.title, `${song.info.songNumber}/${song.info.playlist.songNumber}`)
}


event.addListener('playList', async function(data) {
	playingPlaylist = true;

	const message = data.message;
	const requester = data.queue[0].requester;
	const channel = data.queue[0].channel;

	embed = await getPlaylistEmbed(data.queue[0], requester);

	if (!message)
		data.message = await channel.send({ embeds : [embed] });
	else
		await message.edit({ embeds: [embed] });

})

event.addListener('finished', async function(finishChannel, playingSong) {
	console.log(finishChannel);
})

module.exports.event = event;