const cheerio = require("cheerio");
const rp = require("request-promise");

const aljazeeraNewsHome = async () => {
	aljazeera_homeNewsArray = [];

	const response = await rp({
		uri: "https://www.aljazeera.com/news/",
	});

	const $ = cheerio.load(response);
	const currentNews = $(".row.topics-sec-item.default-style");

	currentNews.each((i, el) => {
		let url = "https://www.aljazeera.com";
		newsPaper = "Aljazeera";
		logo =
			"https://pbs.twimg.com/profile_images/981819775817957377/VVKcF_Y6_400x400.jpg";
		currentNewsTitle = $(el).find("div a h2").text().replace(/\s\s+/g);
		currentNewsImg1 = $(el).find(".img-responsive.lazy").attr("src");
		currentNewsLink1 = $(el).find("div a").attr("href");
		currentNewsTime = $(el).find("div p time#PubTime").text();
		currentNewsLocation = $(el).find("div p a").text();

		currentNewsImg = url + currentNewsImg1;
		currentNewsLink = url + currentNewsLink1;

		randomTime = Math.floor(Math.random() * 1000000);
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, "0");
		let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
		let yyyy = today.getFullYear();

		today = mm + "/" + dd + "/" + yyyy;
		newdate = Date.parse(today);
		getTime = newdate + randomTime;

		aljazeera_homeNewsArray.push({
			newsPaper,
			logo,
			currentNewsTitle,
			currentNewsImg,
			currentNewsLink,
			currentNewsLocation,
			currentNewsTime,
			getTime,
		});
		return aljazeera_homeNewsArray;
	});
	return aljazeera_homeNewsArray;
};

module.exports = aljazeeraNewsHome;
