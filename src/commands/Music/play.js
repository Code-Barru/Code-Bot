const { SlashCommandBuilder } = require('@discordjs/builders');
const play = require('../../functions/music/play');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays a song in the voice channel')
        .addStringOption(string => 
            string
                .setName('song')
                .setDescription('Play a given song name/URL in the voice channel')
                .setRequired(true)),
	async execute(interaction) {
		
        const song = interaction.options.getString('song');

        const voiceChannel = interaction.member.voice.channel;
        await play({
			interaction: interaction,
			voiceChannel: voiceChannel,
			song: song
		});

		interaction.reply('TeST');
	},
};