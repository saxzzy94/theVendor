const cheerio = require("cheerio");
const rp = require("request-promise");

const guardianHome = async () => {
	g_homeNewsArray = [];

	const response = await rp({
		uri: `https://t.guardian.ng/category/news/nigeria/`,
	});

	const $ = cheerio.load(response);
	const currentNews = $(".category-table div .table");

	currentNews.each(async (i, el) => {
		newsPaper = "Guardian";
		logo =
			"https://pbs.twimg.com/profile_images/1083976198609350656/CJzypjqN_400x400.jpg";

		// currentNewsImg = $(el).find(".cell.image-cell div a img").attr("src");
		currentNewsTitle = $(el).find("a div span.title").text();
		currentNewsLink = $(el).find(".cell.headline-cell a").attr("href");

		currentNewsTime = $(el).find(".cell.headline-cell a .meta .age").text();

		randomTime = Math.floor(Math.random() * 1000000);
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, "0");
		let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
		let yyyy = today.getFullYear();

		today = mm + "/" + dd + "/" + yyyy;
		newdate = Date.parse(today);
		getTime = newdate + randomTime;

		g_homeNewsArray.push({
			newsPaper,
			logo,
			// currentNewsImg,
			currentNewsTitle,
			currentNewsLink,
			currentNewsTime,
			getTime,
		});
	});
	return g_homeNewsArray;
};

module.exports = guardianHome;
