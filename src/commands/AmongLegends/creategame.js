const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageButton } = require('discord.js');
const { amongRoles, hasActiveGames, setActiveGames } = require('../../assets/amongLegendGames');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('creategame')
		.setDescription('Create an Among Legends game.')
		.addUserOption(option => 
			option
			.setName('player1')
			.setDescription('The first player')
			.setRequired(true))
		.addUserOption(option => 
			option
			.setName('player2')
			.setDescription('The second player')
			.setRequired(true))
		.addUserOption(option => 
			option
			.setName('player3')
			.setDescription('The third player')
			.setRequired(true))
		.addUserOption(option => 
			option
			.setName('player4')
			.setDescription('The forth player')
			.setRequired(true))
		.addUserOption(option => 
			option
			.setName('player5')
			.setDescription('The fifth player')
			.setRequired(true)),
	
	async execute(interaction, client) {

		var tmp = []

		for (var i=0 ; i < 5 ; i++) {
			tmp.push(interaction.options.getUser(`player${i+1}`));
			if (tmp[i].bot) {
				interaction.reply(`You gave a bot as a player ! **(${tmp[i].username})**.`);
				return;
			}
		}

		const players = tmp;

		// if (!players.size != tmp.length) {
		// 	interaction.reply('You gave multiple times the same player !');
		// 	return;
		// }

		amongRoles.sort(() => Math.random() - 0.5);

		data = {}
		data.players = []
		data.minuteCMP = 0;

		for (var i=0 ; i < players.length ; i++) {
			players[i].role = amongRoles[i].name;
			data.players.push(players[i]);
			players[i].send({content: "Here is your role : ", embeds: [amongRoles[i].embed]});
		}

		console.log(hasActiveGames(interaction.user.id))
		setActiveGames(interaction.user.id, data);
		console.log(hasActiveGames(interaction.user.id))
		interaction.reply('fini.');
	}
			
}