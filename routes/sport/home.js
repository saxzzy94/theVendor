const bbcSport = require("../../controller/sport-News/bbcSportNews/bbcSport");
const beinSport = require("../../controller/sport-News/beinSportNews/beinSport");
const goalSport = require("../../controller/sport-News/goalSportNews/goalSport");

module.exports = home = async (req, res) => {
	try {
		let newArray = [];
		// bbcSport;
		const bbcSportArray = await bbcSport();
		bbcSportArray.forEach(bbc_currentNews => {
			newArray.push(bbc_currentNews);
		});

		// // beinSport;
		// const beinSportArray = await beinSport();
		// beinSportArray.forEach(bein_currentNews => {
		// 	newArray.push(bein_currentNews);
		// });

		// // goalSport;
		// const goalSportArray = await goalSport();
		// goalSportArray.forEach(goal_currentNews => {
		// 	newArray.push(goal_currentNews);
		// });

		//sort Array
		sortedArr = newArray.sort((a, b) => b.getTime - a.getTime);
		res.json({ sortedArr });
	} catch (err) {
		res.status(404).json({ error: "something went wrong" });
	}
};
