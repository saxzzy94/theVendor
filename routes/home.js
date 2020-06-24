const cheerio = require("cheerio");
const rp = require("request-promise");

const home = async (req, res) => {
	try {
		currentNewsArray = [];
		//Vanguard News
		const response = await rp({
			uri: "https://www.vanguardngr.com/news/",
		});

		const $ = cheerio.load(response);
		const currentNews = $("#main article");

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

			newdate = currentNewsDate + " " + currentNewsTime;
			getTime = Date.parse(newdate);

			const currentNews = {
				currentNewsImg,
				currentNewsTitle,
				currentNewsLink,
				currentNewsDesc,
				currentNewsDate,
				currentNewsTime,
				getTime,
			};
			currentNewsArray.push(currentNews);
			return currentNewsArray;
		});

		//PunchNews

		const response1 = await rp({
			uri: "https://punchng.com/all-posts",
		});
		const $$ = cheerio.load(response1);
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

			p_currentNews = {
				currentNewsImg,
				currentNewsTitle,
				currentNewsLink,
				currentNewsDesc,
				currentNewsDate,
				latestNewsTime,
			};
			currentNewsArray.push(p_currentNews);
			return currentNewsArray;
		});
		const response2 = await rp({
			uri: "https://www.punchng.com/",
		});

		const p = cheerio.load(response2);
		const latestNews = p(".title-header").siblings("ul").children("li");

		latestNews.each((i, el) => {
			latestNewsTime = p(el).find("._time").text().trim();
			p_currentNews.latestNewsTime = latestNewsTime;

			currentNewsArray.push(p_currentNews.latestNewsTime);
			return currentNewsArray;
		});

		res.json({ currentNewsArray });
	} catch (error) {
		res.status(404).json(error);
	}
};

module.exports = home;
