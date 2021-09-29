const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Joue une musique.')
        .addStringOption(option => option.setName("song").setDescription("La musique que tu veux jouer.")),
    
    async execute(interaction,client) {
        song = interaction.options.getString("song");
        
        if (!song) {
            await interaction.reply("Tu as oublié de donner une musique !");
            return;
        }
        
        client.distube.playVoiceChannel(interaction.member.voice.channel,song);
    }
}