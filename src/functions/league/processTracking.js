const { MessageEmbed } = require('discord.js');
const getQueue = require('./getQueue');
//const connectionSQL = require('../../bot')

// query all players tracked
// check if they rank changed
// if so, send a message to all guild that track that player
// insert into the database


async function processPlayer(client, connectionSQL, account) {


	connectionSQL.query(`
	SELECT * 
	FROM lolplayers_${account.ID} 
	WHERE query_date=(
		SELECT MAX(query_date) 
		FROM lolplayers_${account.ID}
	)`,
	function(error,result,fields) {
		if (error) {
			console.log(error);
			return;
		}

		console.log(result);
	})
}

module.exports = async function processTracking(client,connectionSQL) {
	
	connectionSQL.query(`
	SELECT * 
	FROM lolplayers
	ORDER BY ID`,
	async function(error,result,fields) {

		if (error) {
			console.log(error);
			return;
		}

		for (const account of result) {
			await processPlayer(client, connectionSQL,account);
		}
	})
};