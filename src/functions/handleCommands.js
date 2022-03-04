const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

const clientId = process.env.CLIENT;
const guildId = process.env.GUILD;


module.exports = (client) => {
    client.handleCommands = async (commandFolders, path,debug) => {
        client.commandArray = [];
        for (folder of commandFolders) {

            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);

                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
                
                if (debug)
                    console.log(`loaded command file ${folder}/${file}.`)
            }
        }

        const rest = new REST({
            version: '9'
        }).setToken(process.env.TOKEN);

        await (async () => {
            console.log();
            try {
                console.log('Started refreshing application (/) commands.');

                await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId), {
                        body: client.commandArray
                    },
                );

                console.log('Successfully reloaded application (/) commands.');
            } catch (error) {
                console.error(error);
            }
        })();
    }
};
