const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song.')
        .addStringOption(option => option.setName("song").setDescription("The song you want to play.")),
    async execute(interaction) {
        await interaction.reply(`Option : ${interaction.options.getString("song")}`);
    }
}