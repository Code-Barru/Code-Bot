const EventEmitter = require('events');
const { MessageEmbed } = require('discord.js')

function getRoleEmbed(role) {
	return new MessageEmbed()
		.setTitle(role.name)
		.setColor(role.color)
		.setThumbnail(role.thumbnail)
		.addField("Description", role.description)
}

var amongRoles = [
	{ 
		name : 'Super Hero',
		description:"He NEEDS to win the game at all cost, he will have a huge penality if he doesn't." +
					"He needs the most kills, assists, and damage at the end of the game." 				+ 
					"He doesn't get a malus if other players spot his role.",
		color: "#f9dc5c",
		thumbnail: "https://www.pixelstalk.net/wp-content/uploads/2016/06/Superman-Logo-Ipad-HD-Image.jpg",
		embed : null
	},
	{
		name : 'Droid',
		description:"He comes in two forms : Normal Droid and Damaged Droid. (1 out of 5 chance to be damaged.)" +  
					"He also need to follow the instructions sent to him via private messages every 5 minutes."  +
					"If he is damaged, the droid has 1/3 of a chance to have 2 instructions and 1/3 of a chance to have none.",
		color: "#465362",
		thumbnail: "https://i.pinimg.com/originals/03/1a/5f/031a5f8202966be469eb5989d1bae4d1.jpg",
		embed : null
	},
	{
		name : 'Snake',
		description: "He needs to win the game with the most death and damage of his team.",
		color: "#69995d",
		thumbnail: "https://babelio.com/users/QUIZ_Serpentard_8454.jpeg",
		embed : null
	},
	{
		name : 'Double-Sided',
		description: "He starts the game good or bad, then randomly changes. He needs to win or loose depending on his side.",
		color: "#f6f7eb",
		thumbnail: "http://vignette4.wikia.nocookie.net/batman/images/3/35/Doubleface.jpg/revision/latest?cb=20130623103553&path-prefix=fr",
		embed : null
	},
	{
		name : 'Impostor',
		description: "He needs to int the game without being noticed.",
		color: "#FF0000",
		thumbnail: "https://vignette.wikia.nocookie.net/heroe/images/5/5f/Impostor.png/revision/latest?cb=20201021025745",
		embed : null
	},
	{
		name : 'Scammer',
		description:"He needs to win the game and to be voted as random other role. " +
					"If more than a half vote him as his fake role, other players get a malus in points.",
		color: "#37505c",
		thumbnail: "https://www.onlygfx.com/wp-content/uploads/2020/05/scam-stamp-1-768x495.png",
		embed : null
	},
	{
		name : 'Devoted Protector',
		description:"He needs to protect a random choosed player." 	+ 
					"If his player dies, he has 30s to die."        + 
					"if the player is an ennemy, he can't kill him."+
					"If the player is an ally, he can't take any kill if the player is fighting.",
		color: "#f76f8e",
		thumbnail: "https://pngimg.com/uploads/heart/heart_PNG691.png",
		embed : null
	},
]

amongRoles.forEach(role => {
	role.embed = getRoleEmbed(role);
})

module.exports.amongRoles = amongRoles;


const activeGames = new Map();

exports.getActiveGames = (userId) => {
	return activeGames.get(userId);
}

exports.deleteActiveGames = (userId) => {
	try {
		activeGames.delete(userId);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}

exports.hasActiveGames = (userId) => {
	return activeGames.has(userId);
}

exports.setActiveGames = (userId, data) => {
	try {
		activeGames.set(userId, data);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}