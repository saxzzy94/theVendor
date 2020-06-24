const cheerio = require("cheerio");
const rp = require("request-promise");

const thisdayHome = async (req, res) => {
	th_homeArray = [];
	const response = await rp({
		uri: "https://www.thisdaylive.com/",
	});

	const $ = cheerio.load(response);

	const latestNews = $(".td_module_6.td_module_wrap.td-animation-stack");

	latestNews.each((i, el) => {
		newsPaper = "Thisday";
		currentNewsTitle = $(el).find("h3 a").text();
		currentNewsTime = $(el)
			.find(".td-module-meta-info span .entry-date.updated.td-module-date")
			.text();
		currentNewsLink = $(el).find("h3 a").attr("href");

		currentNewsImg1 = $(el).find("div a img").attr("src");
		currentNewsImg =
			currentNewsImg1.substring(0, currentNewsImg1.length - 11) + ".jpg";

		randomTime = Math.floor(Math.random() * 100);
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, "0");
		let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
		let yyyy = today.getFullYear();

		today = mm + "/" + dd + "/" + yyyy;
		newdate = Date.parse(today);
		getTime = newdate + randomTime;

		th_homeArray.push({
			newsPaper,
			currentNewsImg,
			currentNewsTitle,
			currentNewsLink,
			currentNewsDate,
			getTime,
		});
	});
	return th_homeArray;
};

module.exports = thisdayHome;
