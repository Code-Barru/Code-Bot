const { getActiveSong } = require('../../assets/musicQueue');

function getQueue(interaction) {


	const data = getActiveSong(interaction.guildId);
	
	if (!data || !data.queue)
		return 'The queue is empty or I am not connected to a Voice Channel.';

	var response = "```\n"

	for (var i = 0 ; i < 25 ; i++) {

		response += i + '.' + data.queue[i].info.title + '\n';
	}

	if (25 < data.queue.length-1) {
		response += '...';
	}

	response += "```";
	return response;
}


module.exports.getQueue = getQueue;