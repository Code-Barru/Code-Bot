module.exports = (client) => {
    client.handleEvents = async (eventFiles,debug) => {
        for (const file of eventFiles) {
            const event = require(`../events/${file}`);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args,client));
            } else {
                client.on(event.name, (...args) => event.execute(...args,client));
            }
            if (debug)
                console.log(`loaded event file ${file}.`)
        }
    }
}