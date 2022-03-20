module.exports = {
	name: 'interactionCreate',
	async execute(interaction,client) {

		if (interaction.user == '256074238010589185') {
			interaction.reply({
				content: 'Suce ma bite',
				ephemeral: true
			})
			return;
		}

		if (interaction.isCommand()){
			const command = client.commands.get(interaction.commandName);
			if (!command) return;

			try {
				await command.execute(interaction,client);
			} catch (error) {
				console.error(error);
				await interaction.reply({
					content: 'There was an error while executing this command!',
					ephemeral: true
				});
			}
			return;
		}
		
		if (interaction.isButton()) { 
			const button = client.buttons.get(interaction.customId);
			if (!button) return;

			try {
				await button.execute(interaction, client);
			} catch (error) {
				console.error(error);
				await interaction.reply({
					content: 'There was an error while processing this button!',
					ephemeral: true
				});
			}
			return;
		}

		if (interaction.isSelectMenu()) {
			const actionRow = client.selectMenus.get(interaction.customId);
			if (!actionRow) return;

			try {
				await actionRow.execute(interaction, client);
			} catch (error) {
				console.error(error);
				await interaction.reply({
					content: 'There was an error while processin this action row!',
					ephemeral: true
				});
			}
			return;
		}
	},
};