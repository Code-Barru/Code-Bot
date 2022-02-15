const { getActiveSong, setActiveSong, event, deleteActiveSong } = require('../../assets/musicQueue');
const playSong = require('./playSong')

module.exports = async function finishedSong(player, connection, dispatcher, interaction) {

	const fetchedData = await getActiveSong(dispatcher.guildId);

	if (fetchedData?.repeat === true) return playSong(fetchedData, interaction);

	await fetchedData.queue.shift();

	if(fetchedData.queue.length > 0) {

		setActiveSong(interaction.guildId, fetchedData);

		playSong(fetchedData, interaction);

	} else {
		event.emit('finish', interaction.channel);
		deleteActiveSong(interaction.guildId);
		player.stop();
		connection.destroy();
	};
};