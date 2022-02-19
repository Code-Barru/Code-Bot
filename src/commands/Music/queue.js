const { SlashCommandBuilder } = require('@discordjs/builders');
const { getQueue } = require('../../functions/music/getQueue');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Display the queue'),
	
	async execute(interaction, client) {
		
		response = getQueue(interaction);

		await interaction.reply(response);
	}
}