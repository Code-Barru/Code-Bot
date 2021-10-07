const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require("discord.js");

function getUserEmbed(user){

    const date = `${user.createdAt.getDate() + 1}/${user.createdAt.getMonth() + 1}/${user.createdAt.getFullYear()}`;

    const userEmbed = new MessageEmbed()


    .setAuthor(`${user.username}`,user.displayAvatarURL())
    .setColor("#F44D4D")
    .setThumbnail(user.displayAvatarURL())
    .setDescription(`<@${user.id}>`)
    .addFields(
        { name: `ID :`, value: `${user.id}`},
        { name: `Date de création :`, value: `${date}`}
    )

    return userEmbed;
}


module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Renvoie des infos sur l\'argument passé.')
        .addSubcommand(subcommand => 
            subcommand
                .setName("user")
                .setDescription("Get informations of a user mentionned.")
                .addUserOption(option => option.setName("target").setDescription("The user mentionned.")))
        
        .addSubcommand(subcommand => 
            subcommand
                .setName("server")
                .setDescription("Info about the server")),
	

    async execute(interaction,client) {
        if (interaction.options.getSubcommand() ===  "user" ) {
            const user = interaction.options.getUser("target");
            if (user) {
                const userEmbed = getUserEmbed(user);

                await interaction.reply( { embeds : [userEmbed] } );
                
            } else {
                const userEmbed = getUserEmbed(interaction.member.user);

                await interaction.reply( { embeds : [userEmbed] } ); 
            }
        } 
        
        else if (interaction.options.getSubcommand() === "server" ) {
            await interaction.reply(`Server Name : ${interaction.guild.name}\nMembers : ${interaction.guild.memberCount}`);
        } else {
            await interaction.reply("No sub command was used.");
        }
	},
};