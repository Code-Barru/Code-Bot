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

        //if(message.author.username == "Code-Barre" || message.author.username == "Mehdi" || message.author.username == "🌸🍰Yayourt🍰🌸") return;

        if (random <= 0.005){
            await message.reply( randomArray( text.ratio ) );
            return;
        }

        if(message.content.toLowerCase().includes(" ratio ") || message.content.toLowerCase() == "ratio") {
            await message.reply( randomArray( text.flop) );
            return;
        }

        if(message.content.length > 450 && random <= 0.3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333) {
            await message.reply( randomArray( text.palu ) );
            return;
        }
    }
}