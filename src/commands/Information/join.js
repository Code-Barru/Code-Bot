const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel } = require('@discordjs/voice');

async function join(interaction) {
    
    const connection = joinVoiceChannel({
        channelId: interaction.member.voice.channelId,
        guildId: interaction.guildId,
        adapterCreator: interaction.guild.voiceAdapterCreator
    })

    await interaction.reply(`Je me suis connecté à : ${interaction.member.voice.channel}`);
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Rejoins le salon vocal dans lequel tu es.'),

    async execute(interaction,client){

        join(interaction);
    }
}