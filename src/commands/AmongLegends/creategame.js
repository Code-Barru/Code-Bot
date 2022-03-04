const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageButton, MessageActionRow, MessageEmbed } = require('discord.js');
const { amongRoles, getActiveGames ,setActiveGames } = require('../../assets/amongLegendGames');


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
			// if (tmp[i].bot) {
			// 	interaction.reply(`You gave a bot as a player ! **(${tmp[i].username})**.`);
			// 	return;
			// }
		}

		const players = tmp;

		// const players = new Set(tmp);

		// if (!players.size != tmp.length) {
		// 	interaction.reply('You gave multiple times the same player !');
		// 	return;
		// }

		amongRoles.sort(() => Math.random() - 0.5);

		data = {};
		data.players = [];
		data.guildId = interaction.guildId;
		data.gameType = 'ARAM';
		data.minuteCMP = 0;
		data.gameStarted = false;

		for (var i=0 ; i < players.length ; i++) {
			players[i].role = amongRoles[i].name;
			data.players.push(players[i]);
			//players[i].send({content: "Here is your role : ", embeds: [amongRoles[i].embed]});
		}

		setActiveGames(data.players[0].id, data);

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId(`startGame`)
					.setLabel('Start Game')
					.setStyle('SUCCESS'),
				new MessageButton()
					.setCustomId(`cancelGame`)
					.setLabel('Cancel Game')
					.setStyle('DANGER')
			)
		
		var presentRoles = data.players[0].role
		var presentPlayers = `<@${data.players[0].id}>`

		for (var i=1 ; i < data.players.length ; i++) {
			presentRoles += '\n' + data.players[i].role;
			presentPlayers += '\n' + `<@${data.players[i].id}>`;
		}

		const embedMessage = new MessageEmbed()
				.setTitle('Among Legend Game')
				.setColor('#FF0000')
				.setThumbnail('https://vignette.wikia.nocookie.net/heroe/images/5/5f/Impostor.png/revision/latest?cb=20201021025745')
				.addField('Roles', presentRoles)
				.addField('Players', presentPlayers)

		interaction.channel.send({
			embeds : [embedMessage]
		})
		interaction.reply({
			components: [row], 
			ephemeral: true
		});

	}
			
}