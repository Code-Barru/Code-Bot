const EventEmitter = require("events");

const activeSongs = new Map();
const event = new EventEmitter

module.exports.event = event;

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