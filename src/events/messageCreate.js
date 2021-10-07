const text = require("../utils/text");
const randomArray = require("../functions/randomArray");

module.exports = {
    name : 'messageCreate',
    async execute(message,client) {    
        
        if(message.author.bot) return;

        if( text.discord_immunises.includes(message.author.username)) return;
    
        if (Math.random() <= 0.005){
            await message.reply( randomArray( text.ratio ) );
            return;
        }
    
        if(message.content.toLowerCase().includes("ratio")) {
            await message.reply( randomArray( text.flop) );
            return;
        }
    
        if(message.content.length > 450 && Math.random() <= 1/3) {
            await message.reply( randomArray( text.palu ) );
            return;
        }
    }
}