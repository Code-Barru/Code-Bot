const fs = require('fs');

module.exports = (client) => {
	client.handleButtons = async (buttonFolder, path, debug) => {

		for (const folder of buttonFolder) {

			const buttonFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));

			for (const file of buttonFiles) {
				const button = require(`../components/buttons/${folder}/${file}`);

				client.buttons.set(button.data.customId, button);

				if (debug)
					console.log(`loaded button file ${folder}/${file}.`);
			}
		}
	}
}