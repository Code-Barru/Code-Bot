module.exports = {
    name : 'messageCreate',
    async execute(message,client) {    
        
        if(message.author.bot) return;

        if (message.content === "reset commands"){
            message.guild.commands.set([]);
            message.delete();
        }

    }
}
