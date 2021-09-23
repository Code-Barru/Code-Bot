module.exports = {
	name: 'ready',
	once: true,

	async execute() {
		console.log(`Succesfully logged into Discord.`);
	},
};