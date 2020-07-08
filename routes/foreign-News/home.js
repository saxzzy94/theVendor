const foxNewsHome = require("../../controller/foreing-News/foxNews-controller/foxNewsHome");
const bbcNewsHome = require("../../controller/foreing-News/bbcNews-controller/bbcNewsHome");
const aljazeeraNewsHome = require("../../controller/foreing-News/aljazeeraNews-controller/aljazeeraNewsHome");
const cnnNewsHome = require("../../controller/foreing-News/cnnNews-controller/cnnNewsHome");

module.exports = home = async (req, res) => {
	try {
		let newArray = [];
		// foxNews;
		const foxNewsArray = await foxNewsHome();
		foxNewsArray.forEach(fox_currentNews => {
			newArray.push(fox_currentNews);
		});

		// bbcNews;
		const bbcNewsArray = await bbcNewsHome();
		bbcNewsArray.forEach(bbc_currentNews => {
			newArray.push(bbc_currentNews);
		});

		// aljazeeraNews;
		const aljazeeraNewsArray = await aljazeeraNewsHome();
		aljazeeraNewsArray.forEach(aljazeera_currentNews => {
			newArray.push(aljazeera_currentNews);
		});

		// cnnNews;
		const cnnNewsArray = await cnnNewsHome();
		cnnNewsArray.forEach(cnn_currentNews => {
			newArray.push(cnn_currentNews);
		});

		//sort Array
		sortedArr = newArray.sort((a, b) => b.getTime - a.getTime);
		res.json({ sortedArr });
	} catch (err) {
		res.status(404).json({ error: "something went wrong" });
	}
};
