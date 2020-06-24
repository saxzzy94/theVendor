const punchHome = require("../controller/punch-controller/punchHome");
const vanguardHome = require("../controller/vanguard-controller/vanguardHome");
const thisdayHome = require("../controller/thisday-controller/thisdayHome");
const channelsHome = require("../controller/channels-controller/channelsHome");
const thenationHome = require("../controller/thenation-controller/thenationHome");
const guardianHome = require("../controller/guardian-controller/guardianHome");

module.exports = homee = async (req, res) => {
	try {
		let newArray = [];
		// Vanguards
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
