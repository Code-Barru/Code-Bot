const { SlashCommandBuilder } = require('@discordjs/builders');
const connectToChannel = require('../../functions/music/connectToChannel');

module.exports = {
data: new SlashCommandBuilder()
	.setName('join')
	.setDescription('Join a channel'),

async execute(interaction, client) {

	if (interaction.member.voice.channelId) {
		await connectToChannel(interaction);
		await interaction.reply('Connected to your channel !');
		return;
	}
	interaction.reply('You are not connected to a Voice Channel !')
	return;
}
}