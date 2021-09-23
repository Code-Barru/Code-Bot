
module.exports = {
    name : 'messageCreate',
    async execute(message,client) {

        const content = message.content
        
        const random = Math.random();

        if(message.author.bot) return;

        if (random <= 0.0005){
            message.reply("ratio");
        }

        if(message.content == "ratio") {
            message.reply("Ptit Flop :flame:");
            return;
        }

        if(message.content.length > 450) {
            message.reply("palu");
            return;
        }
    }
}