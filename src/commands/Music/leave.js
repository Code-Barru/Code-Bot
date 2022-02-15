const { SlashCommandBuilder } = require('@discordjs/builders');
const leave = require('../../functions/music/leave');

module.exports = {
data: new SlashCommandBuilder()
	.setName('leave')
	.setDescription('Leave voice channel.'),

async execute(interaction, client) {
	leave(interaction)
}
}