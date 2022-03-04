const { deleteActiveGames } = require('../../assets/amongLegendGames')

module.exports.processEndGame = function(game) {

	deleteActiveGames(game.interaction.id);
	
}