const { SlashCommandBuilder } = require("@discordjs/builders");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('gameroles')
		.setDescription('Send you in pm the roles of a game')
		.addUserOption(option => 
			option
				.setName('player')
				.setDescription('A player in an Among Legends game.')
				.setRequired(true)),

	async execute(interaction, client) {

		interaction.reply('sa marsh');
	}
}