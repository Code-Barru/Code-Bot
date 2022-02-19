const { getActiveSong } = require('../../assets/musicQueue');

function getQueue(interaction) {


	var compteur = 0;
	const data = getActiveSong(interaction.guildId);
	
	if (!data || !data.queue)
		return 'The queue is empty or I am not connected to a Voice Channel.';

	var response = "```\n"

	for (const song of data.queue) {

		response += compteur++ + '.' + song.info.title + '\n';
	}

	response += "```";
	return response;
}


module.exports.getQueue = getQueue;