const rp = require("request-promise");

const cheerio = require("cheerio"); // Basically jQuery for node.js

(async () => {
	const response = await rp({
		uri: `https://thenationonlineng.net/category/news/`,
		headers: {
			"User-Agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36",
		},
		gzip: true,
	});
	const $ = cheerio.load(response);
	console.log($.html());
})();
