const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents : [ 
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES 
]});

require('dotenv').config();

client.commands = new Collection();


const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync("./src/commands");

const debug = true;

(async () => {  
    for (file of functions) {
        
        require(`./functions/${file}`) (client);
        if(debug)
            console.log(`loaded function file ${file}.`);
    }

    client.handleEvents(eventFiles,debug);
    client.handleCommands(commandFolders,"./src/commands",debug);
    await client.login(process.env.TOKEN);
})();