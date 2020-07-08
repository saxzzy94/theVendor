const cheerio = require("cheerio");
const rp = require("request-promise");

const foxNewsHome = async () => {
	fox_homeNewsArray = [];

	const response = await rp({
		uri: "https://www.foxnews.com/world",
	});

	const $ = cheerio.load(response);
	const currentNews = $(
		".collection.collection-article-list.has-load-more .content.article-list article.article"
	);

	currentNews.each((i, el) => {
		url = "https://www.foxnews.com";
		newsPaper = "Fox News";
		logo =
			"https://pbs.twimg.com/profile_images/918480715158716419/4X8oCbge_400x400.jpg";
		currentNewsTitle = $(el)
			.find("div.info header h4 a")
			.text()
			.replace(/\s\s+/g);
		currentNewsImg = $(el).find("div.m a img").attr("src");
		currentNewsLink1 = $(el).find("div.info header h4 a").attr("href");
		currentNewsTime = $(el)
			.find("div.info header div.meta div span.time")
			.text();
		currentNewsLocation = $(el)
			.find("div.info header div.meta div span.eyebrow a")
			.text();

		currentNewsLink = url + currentNewsLink1;

		randomTime = Math.floor(Math.random() * 1000000);
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, "0");
		let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
		let yyyy = today.getFullYear();

		today = mm + "/" + dd + "/" + yyyy;
		newdate = Date.parse(today);
		getTime = newdate + randomTime;

		fox_homeNewsArray.push({
			newsPaper,
			logo,
			currentNewsTitle,
			currentNewsImg,
			currentNewsLink,
			currentNewsLocation,
			currentNewsTime,
			getTime,
		});
		return fox_homeNewsArray;
	});
	return fox_homeNewsArray;
};

module.exports = foxNewsHome;
