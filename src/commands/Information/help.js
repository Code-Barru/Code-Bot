const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


const mainHelpEmbed = new MessageEmbed()


module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Affiche l\'aide')
		.addStringOption(
			option => option.setName('commande')
			.setDescription('La commande sur laquelle tu veux de l\'aide.')
			.setRequired(false)
		),
	
	async execute(interaction, client) {
		
		const commande = interaction.options.getString('commande');

		if (!commande) {
			interaction.reply('pas de commande');
		}
		else {
			interaction.reply(commande);
		}
	}
}