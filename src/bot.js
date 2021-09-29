const { Client, Intents, Collection } = require('discord.js');
const DisTube = require('distube');
const fs = require('fs');

const client = new Client({ intents : [ 
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES 
    ]});

client.distube = new DisTube.default(client, { searchSongs : 0, emitNewSongOnly : true, leaveOnFinish : true});

require('dotenv').config();

client.commands = new Collection();


const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {

    for (file of functions) {
        require(`./functions/${file}`) (client);
    }
    client.handleEvents(eventFiles);
    client.handleCommands(commandFolders,"./src/commands");
    client.login(process.env.TOKEN);
    
})();