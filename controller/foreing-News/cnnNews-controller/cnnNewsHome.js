const cheerio = require("cheerio");
const rp = require("request-promise");

const cnnNewsHome = async () => {
	cnn_homeNewsArray = [];

	const response = await rp({
		uri: "https://edition.cnn.com/world",
	});

	const $ = cheerio.load(response);
	const currentNews = $(
		".cn.cn-grid-small.cn--idx-0.cn-coverageContainer_45F12FF6-D9C4-8C49-A118-3A4AEA87BF57.cn-grid.cn-grid--small div article"
	);

	currentNews.each((i, el) => {
		url = "https://edition.cnn.com";
		newsPaper = "CNN";
		logo =
			"https://i.pinimg.com/236x/51/07/ed/5107edcdb000223f90277675e5ac2928.jpg";
		currentNewsTitle = $(el).find("h3 a span").text().replace(/\s\s+/g);
		currentNewsImg = $(el).find("div .media a img").attr("data-src-full16x9");
		currentNewsLink1 = $(el).find("h3 a").attr("href");
		currentNewsDesc = $(el).find("div .media a img").attr("alt");

		currentNewsLink = url + currentNewsLink1;

		randomTime = Math.floor(Math.random() * 1000000);
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, "0");
		let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
		let yyyy = today.getFullYear();

		today = mm + "/" + dd + "/" + yyyy;
		newdate = Date.parse(today);
		getTime = newdate + randomTime;

		cnn_homeNewsArray.push({
			newsPaper,
			logo,
			currentNewsTitle,
			currentNewsImg,
			currentNewsLink,
			getTime,
		});
		return cnn_homeNewsArray;
	});
	return cnn_homeNewsArray;
};

module.exports = cnnNewsHome;
