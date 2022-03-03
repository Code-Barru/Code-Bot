const text = require("../assets/text");
const randomArray = require("../functions/randomArray");

module.exports = {
    name : 'messageCreate',
    async execute(message,client) {    
        
        if(message.author.bot) return;

        if (message.content === "reset commands"){
            message.guild.commands.set([]);
            message.reply('Reseted guild commands !');
        }
    
        if (Math.random() <= 1/3000){
            await message.reply( randomArray( text.ratio ) );
            return;
        }
    
        if(message.content.toLowerCase().includes("ratio")) {
            await message.reply( randomArray( text.flop ) );
            return;
        }
    
        if(message.content.length > 450 && Math.random() <= 1/10) {
            await message.reply( randomArray( text.palu ) );
            return;
        }
    }
}