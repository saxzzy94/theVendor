const cheerio = require("cheerio");
const rp = require("request-promise");

const goalSport = async () => {
	goalSportNews = [];

	const response = await rp({
		uri: "https://www.goal.com/en/news/1",
	});

	const $ = cheerio.load(response);
	const currentNews = $(".widget-news-archive.newsarchive-card-group table");

	currentNews.each((i, el) => {
		url = "https://goal.com/";
		newsPaper = "Goal";
		logo =
			"https://pbs.twimg.com/profile_images/918480715158716419/4X8oCbge_400x400.jpg";
		currentNewsTitle = $(el)
			.find(".widget-news-card__content h3 a")
			.text()
			.replace(/\s\s+/g);
		currentNewsImg = $(el).find(".widget-news-card__image a img").attr("src");
		currentNewsLink =
			url + $(el).find(".widget-news-card__image a").attr("href");
		currentNewsTime = $(el).find(".widget-news-card__date").text();
		currentNewsLocation = $(el)
			.find(".widget-news-card__category")
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

		goalSportNews.push({
			//newsPaper,
			//logo,
			currentNewsTitle,
			currentNewsImg,
			currentNewsLink,
			currentNewsLocation,
			currentNewsTime,
			getTime,
		});
		return goalSportNews;
	});
	return goalSportNews;
};
module.exports = goalSport;
