const cheerio = require("cheerio");
const rp = require("request-promise");

const vanguardHome = async () => {
	v_homeNewsArray = [];

	const response = await rp({
		uri: "https://www.vanguardngr.com/news/",
	});

	const $ = cheerio.load(response);
	const currentNews = $("#main article");

	currentNews.each((i, el) => {
		newsPaper = "Vanguard";

		currentNewsTitle = $(el).find(".rtp-post-content header h2 a").text();
		currentNewsImg = $(el).find(".rtp-post-thumbnail a img").attr("src");
		currentNewsLink = $(el).find(".rtp-post-content header h2 a").attr("href");
		currentNewsDesc = $(el).find(".rtp-post-content div p").text();
		currentNewsDate = $(el)
			.find(".rtp-post-content header span a .entry-date.published")
			.text();
		currentNewsTime = $(el)
			.find(".rtp-post-content header span .rtp-meta-time")
			.text();

		randomTime = Math.floor(Math.random() * 100);
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, "0");
		let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
		let yyyy = today.getFullYear();

		today = mm + "/" + dd + "/" + yyyy;
		newdate = Date.parse(today);
		getTime = newdate + randomTime;

		v_homeNewsArray.push({
			newsPaper,
			currentNewsTitle,
			currentNewsImg,
			currentNewsLink,
			currentNewsDesc,
			currentNewsDate,
			currentNewsTime,
			getTime,
		});
	});
	return v_homeNewsArray;
};

module.exports = vanguardHome;
