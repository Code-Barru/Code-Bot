const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require("discord.js");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Return Infos based on input')
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
                const userEmbed = new MessageEmbed()
                    .setTitle(`${user.username}`)
                    .setColor("#F44D4D")
                    .setThumbnail(user.displayAvatarURL())
                    .addFields(
                        { name: `Nom :`,value: `${user.tag}`},
                        { name: `ID :`, value: `${user.id}`}
                    )

                await interaction.reply( { embeds : [userEmbed] } );
                
            } else {
                const userEmbed = new MessageEmbed()
                .setTitle(`${user.username}`)
                .setColor("#F44D4D")
                .setThumbnail(user.displayAvatarURL())
                .addFields(
                    { name: `Nom :`,value: `${interaction.user.tag}`},
                    { name: `ID :`, value: `${interaction.user.id}`}
                )

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