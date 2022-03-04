require('dotenv').config();
const debug = (process.env.DEBUG == 'true');

const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
const mysql = require('mysql2');
const schedule = require('node-schedule');

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync("./src/commands");
const buttonFolders = fs.readdirSync("./src/components/buttons");
const selectMenusFolders = fs.readdirSync("./src/components/selectMenus");


const client = new Client({ intents : [ 
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
]});

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();

async function setupBot(){
    for (file of functions) {
        require(`./functions/${file}`) (client);
        if(debug)
            console.log(`loaded function file ${file}.`);
    }
    await client.handleEvents(eventFiles,debug);
    
    await client.handleButtons(buttonFolders, "./src/components/buttons", debug);
    await client.handleSelectMenus(selectMenusFolders, "./src/components/selectMenus", debug);
    await client.handleCommands(commandFolders,"./src/commands",debug);
    
    await client.login(process.env.TOKEN);
}

setupBot();

const connectionSQL = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

const {processGames} = require('./functions/AmongLegends/processGames');

schedule.scheduleJob('*/1 * * * *', async () => {
    await processGames();
})

if(!debug)
connectionSQL.connect(async function(err) {
	
	if (err) {
	  console.error('error connecting: ' + err.stack);
	  return;
	}
	console.log('Successfully connected to database as id ' + connectionSQL.threadId);

    const processTracking = require('./functions/league/processTracking');

     schedule.scheduleJob('*/1 * * * *', async () => {
        await processTracking(client,connectionSQL);
     })
    
});

module.exports = connectionSQL;