const cheerio = require("cheerio");
const rp = require("request-promise");

const thisdayController = async (req, res) => {
	try {
		currentNewsArray = [];
		latestNewsArray = [];
		const response = await rp({
			uri: "https://www.thisdaylive.com/",
		});

		const $ = cheerio.load(response);
		const currentNews = $(".td_block_inner .td-block-span6 ").children(
			".td_module_2.td_module_wrap.td-animation-stack"
		);

		const latestNews = $(".td_module_6.td_module_wrap.td-animation-stack");

		currentNews.each((i, el) => {
			currentNewsImg1 = $(el).find("div a img").attr("src");

			currentNewsTitle = $(el).find("h3 a").text();
			currentNewsLink = $(el).find("h3 a").attr("href");
			currentNewsDesc = $(el).find("div.td-excerpt").text();
			currentNewsDate = $(el).find(".td-post-date").text();

			currentNewsImg =
				currentNewsImg1.substring(0, currentNewsImg1.length - 12) + ".jpg";

			const currentNews = {
				currentNewsImg,
				currentNewsTitle,
				currentNewsLink,
				currentNewsDesc,
				currentNewsDate,
			};
			currentNewsArray.push(currentNews);
			return currentNewsArray;
		});
		latestNews.each((i, el) => {
			latestNewsTitle = $(el).find("h3 a").text();
			latestNewsTime = $(el)
				.find(".td-module-meta-info span .entry-date.updated.td-module-date")
				.text();
			latestNewsLink = $(el).find("h3 a").attr("href");
			latestNewsImg1 = $(el).find("div a img").attr("src");
			latestNewsImg =
				latestNewsImg1.substring(0, latestNewsImg1.length - 11) + ".jpg";

			const latestNews = {
				latestNewsTitle,
				latestNewsTime,
				latestNewsLink,
				latestNewsImg,
			};
			latestNewsArray.push(latestNews);
		});
		res.json({ currentNewsArray, latestNewsArray });
	} catch (error) {
		res.status(404).json(error);
	}
};

module.exports = thisdayController;
