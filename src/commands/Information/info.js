const { SlashCommandBuilder } = require('@discordjs/builders');

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
	

    async execute(interaction) {
        if (interaction.options.getSubcommand() ===  "user" ) {
            const user = interaction.options.getUser("target");
            if (user) {
                await interaction.reply(`Username : ${user.username}\n`);
                interaction.channel.send(`${user.displayAvatarURL()}`);
                
            } else {
                await interaction.reply(`Username : ${interaction.user.username}\n`);
                interaction.channel.send(`${interaction.user.displayAvatarURL()}`);
                
            }
        } 
        
        else if (interaction.options.getSubcommand() === "server" ) {
            await interaction.reply(`Server Name : ${interaction.guild.name}\nMembers : ${interaction.guild.memberCount}`);
        } else {
            await interaction.reply("No sub command was used.");
        }
	},
};