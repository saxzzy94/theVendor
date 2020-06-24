const cheerio = require("cheerio");
const rp = require("request-promise");

const punchController = async (req, res) => {
	try {
		latestNewsArray = [];
		const response = await rp({
			uri: "https://www.punchng.com/",
		});

		const $ = cheerio.load(response);

		const latestNews = $(".title-header").siblings("ul").children("li");

		currentNewsArray = [];
		const response2 = await rp({
			uri: "https://punchng.com/all-posts",
		});

		const $$ = cheerio.load(response2);
		const currentNewsElement = $$(".items.col-sm-12");

		currentNewsElement.each((i, el) => {
			backgroundImage = $$(el)
				.find("a .filler div .blurry")
				.css("background-image");
			currentNewsTitle = $$(el).find("a .filler div h2").text();
			currentNewsLink = $$(el).find("a").attr("href");
			currentNewsDesc = $$(el).find(".seg-summary p").text();
			currentNewsDate = $$(el).find(".seg-time").text();

			currentNewsImg =
				backgroundImage.substring(5, backgroundImage.length - 12) + ".jpg";
			currentNews = {
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
			latestNewsTitle = $(el).find("a h3").text().trim();
			latestNewsTime = $(el).find("._time").text().trim();
			latestNewsLink = $(el).find("a").attr("href");

			const latestNews = {
				latestNewsTitle,
				latestNewsTime,
				latestNewsLink,
			};

			latestNewsArray.push(latestNews);
			return latestNewsArray;
		});

		res.json({ currentNewsArray, latestNewsArray });
	} catch (error) {
		res.status(404).json(error);
	}
};

module.exports = punchController;
