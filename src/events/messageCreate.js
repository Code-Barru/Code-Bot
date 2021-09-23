const text = require("./text.js");

function randomArray(array) {
    return array[ Math.floor( Math.random() * array.length ) ];
}

module.exports = {
    name : 'messageCreate',
    async execute(message,client) {

        const content = message.content
        
        const random = Math.random();

        if(message.author.bot) return;

        //if(message.author.username == "Code-Barre") return;

        if (random <= 0.001){
            await message.reply( randomArray( text.ratio ) );
        }

        if(message.content == "ratio") {
            await message.reply( "Ptit Flop :flame:" );
            return;
        }

        if(message.content.length > 450 && random <= 0.333333) {
            await message.reply( randomArray( text.palu ) );
            return;
        }
    }
}