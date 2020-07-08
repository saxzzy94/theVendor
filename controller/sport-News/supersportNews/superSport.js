const cheerio = require("cheerio");
const rp = require("request-promise");

const foxNewsHome = (async () => {
	superSportNews = [];

	const response = await rp({
		uri: "https://supersport.com",
	});

	const $ = cheerio.load(response).html();

	let parser = new DOMParser();
	if ($) {
		let html = parser.parseFromString($, "text/html");
		console.log(html);
	} else {
		console.error("something went wrong");
	}
	// const currentNews = $("div.row").html();
	// console.log(currentNews)

	// currentNews.each((i, el) => {
	// 	url = "https://supersport.com/";
	// 	newsPaper = "Super Sport";
	// 	logo =s
	// 		"https://pbs.twimg.com/profile_images/918480715158716419/4X8oCbge_400x400.jpg";
	// 	currentNewsTitle = $(el)
	// 		.find(".video-details .article-title")
	// 		.text()
	// 		.replace(/\s\s+/g);
	// 	currentNewsImg = $(el).find("figure img").attr("src");
	// 	currentNewsLink = $(el).find("a").attr("href");
	// 	currentNewsTime = $(el).find(".article-date").text();
	// 	currentNewsLocation = $(el).find(".tournament-name").text();

	// 	currentNewsLink = url + currentNewsLink1;

	// 	randomTime = Math.floor(Math.random() * 1000000);
	// 	let today = new Date();
	// 	let dd = String(today.getDate()).padStart(2, "0");
	// 	let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
	// 	let yyyy = today.getFullYear();

	// 	today = mm + "/" + dd + "/" + yyyy;
	// 	newdate = Date.parse(today);
	// 	getTime = newdate + randomTime;

	// 	superSportNews.push({
	// 		newsPaper,
	// 		logo,
	// 		currentNewsTitle,
	// 		currentNewsImg,
	// 		currentNewsLink,
	// 		currentNewsLocation,
	// 		currentNewsTime,
	// 		getTime,
	// 	});
	// 	return superSportNews;
	// });
	// console.log(superSportNews);
})();

module.exports = foxNewsHome;
