const fs = require('fs');

module.exports = (client) => {
	client.handleSelectMenus = async (selectMenusFolder, path, debug) => {

		for (const folder of selectMenusFolder) {

			const selectMenuFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));

			for (const file of selectMenuFiles) {
				const selectMenu = require(`../components/selectMenus/${folder}/${file}`);

				client.selectMenus.set(selectMenu.data.customId, selectMenu);

				if (debug)
					console.log(`loaded select menu file ${folder}/${file}.`);
			}
		}
	}
}