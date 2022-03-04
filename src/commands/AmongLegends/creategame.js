const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageSelectMenu, MessageActionRow } = require('discord.js');
const { amongRoles, hasActiveGames ,setActiveGames } = require('../../assets/amongLegendGames');


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

		const players = new Set();

		for (var i=0 ; i < 5 ; i++) {
			players.add(interaction.options.getUser(`player${i+1}`));
			// if (tmp[i].bot) {
			// 	interaction.reply(`You gave a bot as a player ! **(${tmp[i].username})**.`);
			// 	return;
			// }
		}

		// if (!players.size != tmp.length) {
		// 	interaction.reply('You gave multiple times the same player !');
		// 	return;
		// }

		for (const player of players) {
			if (hasActiveGames(player.id)) {
				interaction.reply(`A player is already in a game **(${player.username})**`)
				return;
			}
		}

		amongRoles.sort(() => Math.random() - 0.5);

		game = {};
		game.players = players;
		game.interaction = interaction;
		game.guildId = interaction.guildId;
		game.owner = interaction.user
		game.minuteCMP = 0;
		game.gameStarted = false;
		game.gameEnded = false;

		for (var i=0 ; i < players.length ; i++) {
			players[i].role = amongRoles[i].name;
			//players[i].send({content: "Here is your role : ", embeds: [amongRoles[i].embed]});
		}

		setActiveGames(interaction.id, game);
	
		const roles = [
			{
				label: 'Super Hero',
				value: 'Super Hero'
			},
			{
				label: 'Droid',
				value: 'Droid'
			},
			{
				label: 'Snake',
				value: 'Snake'
			},
			{
				label: 'Double-Sided',
				value: 'Double-Sided'
			},
			{
				label: 'Imposter',
				value: 'Imposter'
			},
			{
				label: 'Scammer',
				value: 'Scammer'
			},
			{
				label: 'Devoted Protector',
				value: 'Devoted Protector'
			}
		]

		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()	
					.setCustomId('gameRoles')
					.setPlaceholder('No roles selected.')
					.addOptions(roles)
					.setMaxValues(5)
			)

		await interaction.reply({
			components: [row]
		});
	}
			
}