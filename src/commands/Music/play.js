const { SlashCommandBuilder } = require('@discordjs/builders');
const play = require('../../functions/music/play');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays a song in the voice channel')
        .addStringOption(string => 
            string
                .setName('song')
                .setDescription('The song you want to play')
                .setRequired(true)),
	async execute(interaction) {
		
        const song = interaction.options.getString('song');
		if (!interaction.member.voice.channelId) {
			await interaction.reply('You are not in a Vocal Channel !');
			return;
		}
        
		await interaction.reply( {content:'**Loading...**'} );
		await play({
			interaction: interaction,
			song: song
		});
	},
};