const punchHome = require("../../controller/Nigerian-News/punch-controller/punchHome");
const vanguardHome = require("../../controller/Nigerian-News/vanguard-controller/vanguardHome");
const thisdayHome = require("../../controller/Nigerian-News/thisday-controller/thisdayHome");
const channelsHome = require("../../controller/Nigerian-News/channels-controller/channelsHome");
const thenationHome = require("../../controller/Nigerian-News/thenation-controller/thenationHome");
const guardianHome = require("../../controller/Nigerian-News/guardian-controller/guardianHome");

module.exports = home = async (req, res) => {
	try {
		let newArray = [];
		// Vanguards;
		const vanguardNewsArray = await vanguardHome();
		vanguardNewsArray.forEach(v_currentNews => {
			newArray.push(v_currentNews);
		});

		//Punch
		const punchNewsArray = await punchHome();
		punchNewsArray.forEach(p_currentNews => {
			newArray.push(p_currentNews);
		});

		//This Day\
		const thisdayNewsArray = await thisdayHome();
		thisdayNewsArray.forEach(th_currentNews => {
			newArray.push(th_currentNews);
		});

		//Channels\
		const channelsNewsArray = await channelsHome();
		channelsNewsArray.forEach(ch_currentNews => {
			newArray.push(ch_currentNews);
		});

		//The Nation\
		const thenationNewsArray = await thenationHome();
		thenationNewsArray.forEach(tn_currentNews => {
			newArray.push(tn_currentNews);
		});

		//The Guardian\
		const guardianNewsArray = await guardianHome();
		guardianNewsArray.forEach(g_currentNews => {
			newArray.push(g_currentNews);
		});

		//sort Array
		sortedArr = newArray.sort((a, b) => b.getTime - a.getTime);
		res.json({ sortedArr });
	} catch (err) {
		res.status(404).json(err);
	}
};
