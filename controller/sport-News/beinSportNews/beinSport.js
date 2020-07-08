const cheerio = require("cheerio");
const rp = require("request-promise");

const beinSport = async () => {
	beinSportNews = [];

	const response = await rp({
		uri: "https://www.beinsports.com/en/news",
	});

	const $ = cheerio.load(response);
	const currentNews = $(
		".infinitescroll_item.content-gallery__item.w50.generic-height"
	);

	currentNews.each((i, el) => {
		url = "https://beinSport.com/";
		newsPaper = "Super Sport";
		logo =
			"https://pbs.twimg.com/profile_images/918480715158716419/4X8oCbge_400x400.jpg";
		currentNewsTitle = $(el).find("figcaption a").text().replace(/\s\s+/g);
		currentNewsImg = $(el).find("li div a img").attr("data-src");
		currentNewsLink = $(el).find("a").attr("href");
		currentNewsTime = $(el).find(".article-date").text();
		currentNewsLocation = $(el)
			.find(".content-gallery__content .category")
			.text()
			.trim();

		randomTime = Math.floor(Math.random() * 1000000);
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, "0");
		let mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
		let yyyy = today.getFullYear();

		today = mm + "/" + dd + "/" + yyyy;
		newdate = Date.parse(today);
		getTime = newdate + randomTime;

		beinSportNews.push({
			//newsPaper,
			//logo,
			currentNewsTitle,
			currentNewsImg,
			currentNewsLink,
			currentNewsLocation,
			// currentNewsTime,
			// getTime,
		});
		return beinSportNews;
	});
	return beinSportNews;
};
module.exports = beinSport;
