// const EventEmitter = require('events');
const { MessageEmbed } = require('discord.js')
const fs = require('fs')

function getRoleEmbed(role) {
	return new MessageEmbed()
		.setTitle(role.name)
		.setColor(role.color)
		.setThumbnail(role.thumbnail)
		.addField("Description", role.description)
}


const amongRoles = new Map();
amongRolesJSON = JSON.parse(fs.readFileSync('./src/assets/amongRoles.json')).amongRoles;

for (const role of amongRolesJSON) {
	role.embed = getRoleEmbed(role);
	amongRoles.set(role.name, role);
}
module.exports.amongRoles = amongRoles;

const activeGames = new Map();
exports.getActiveGames = (userId) => {
	return activeGames.get(userId);
}

exports.deleteActiveGames = (userId) => {
	try {
		activeGames.delete(userId);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}

exports.hasActiveGames = (userId) => {
	for (const game of activeGames) 
		for (const player of game[1].players)
			if (player.id === userId)
				return true;
				
	return false;
}

exports.setActiveGames = (userId, data) => {
	try {
		activeGames.set(userId, data);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}

exports.getGameEmbed = (game) => {

	console.log(game.players)

	for (var i=0 ; i < game.players.size ; i++) {

		if ( i==0 ) {
			presentRoles = game.players[i].role;
			presentPlayers = `<@${game.players[i].id}>`
		} else {
			presentRoles += '\n' + game.players[i].role;
			presentPlayers = `\n<@${game.players[i].id}>`
		}
	}

	console.log(presentPlayers);
	console.log(presentRoles)

	return new MessageEmbed()
		.setTitle('Among Legend Game')
		.setColor(game.gameEnded ? '#0000FF' : (game.gameStarted ? '#00FF00' : '#FF0000') )
		.setThumbnail('https://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/Udyr.png')
		.addField('Mode', game.gameType)
		.addField('Roles', presentRoles)
		.addField('Players', presentPlayers)
}