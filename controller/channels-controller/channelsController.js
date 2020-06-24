const cheerio = require("cheerio");
const rp = require("request-promise");

const vangardController = async (req, res) => {
	try {
		currentNewsArray = [];
		latestNewsArray = [];
		const response = await rp({
			uri: "https://www.vanguardngr.com/news/",
		});

		const $ = cheerio.load(response);
		const currentNews = $("#main article");
		const latestNews = $("#latest-news-list li");

		currentNews.each((i, el) => {
			currentNewsImg = $(el).find(".rtp-post-thumbnail a img").attr("src");
			currentNewsTitle = $(el).find(".rtp-post-content header h2 a").text();
			currentNewsLink = $(el)
				.find(".rtp-post-content header h2 a")
				.attr("href");
			currentNewsDesc = $(el).find(".rtp-post-content div p").text();
			currentNewsDate = $(el)
				.find(".rtp-post-content header span a .entry-date.published")
				.text();
			currentNewsTime = $(el)
				.find(".rtp-post-content header span .rtp-meta-time")
				.text();

			newdate = Date.now();

			const currentNews = {
				currentNewsImg,
				currentNewsTitle,
				currentNewsLink,
				currentNewsDesc,
				currentNewsDate,
				currentNewsTime,
				newdate,
			};
			currentNewsArray.push(currentNews);
			return currentNewsArray;
		});
		latestNews.each((i, el) => {
			latestNewsTitle = $(el).find(".rtp-latest-news-title a").text();
			latestNewsTime = $(el).find(".post-date").text();
			latestNewsLink = $(".rtp-latest-news-title a").attr("href");

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

module.exports = vangardController;
