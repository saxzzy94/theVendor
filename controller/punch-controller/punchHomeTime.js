// const cheerio = require("cheerio");
// const rp = require("request-promise");

// const punchHomeTime = async () => {
// 	const response2 = await rp({
// 		uri: "https://www.punchng.com/",
// 	});

// 	const p = cheerio.load(response2);
// 	const latestNews = p(".title-header").siblings("ul").children("li");

// 	latestNews.each((i, el) => {
// 		punchNewsTime = p(el).find("._time").text().trim();
// 		return punchNewsTime;
// 	});
// 	return punchNewsTime;
// };
// module.exports = punchHomeTime;
