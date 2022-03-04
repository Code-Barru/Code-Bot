const { SlashCommandBuilder } = require("@discordjs/builders");
const { amongRoles } = require('../../assets/amongLegendGames');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roles')
		.setDescription('Send you in pm the roles of a game')
		.addNumberOption(option => 
			option
				.setName('role')
				.setDescription('The role you want info.')
				.setRequired(false)
				.addChoice('Super Hero', 0)
				.addChoice('Droid', 1)
				.addChoice('Snake', 2)
				.addChoice('Double-Sided', 3)
				.addChoice('Impostor', 4)
				.addChoice('Scammer', 5)
				.addChoice('Devoted Protector', 6)),

	async execute(interaction, client) {

		const role = interaction.options.getNumber('role');

		if (!role) {
			interaction.reply({embeds : [
				amongRoles[0].embed, 
				amongRoles[1].embed, 
				amongRoles[2].embed, 
				amongRoles[3].embed, 
				amongRoles[4].embed, 
				amongRoles[5].embed, 
				amongRoles[6].embed
			]});
			return;
		}

		interaction.reply({embeds: [amongRoles[role].embed]})
	}
}