const { getActiveSong } = require('../../assets/musicQueue');

function changeRepeat(interaction, option) {

	data = getActiveSong(interaction.guildId);

	if(!data) {
		return;
	}
	if (option === 'queue') {
		if (data.repeat === 'queue') {
			data.repeat = null;
			return 'off';
		}
		else {
			data.repeat = option;
			return 'queue';
		}
	}
	if (option === 'song') {
		if (data.repeat == 'song') {
			data.repeat = null;
			return 'off';
		}
		else {
			data.repeat = option;
			return 'song ';
		}
	}
}


module.exports.changeRepeat = changeRepeat;
