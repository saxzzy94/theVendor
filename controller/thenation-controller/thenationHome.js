const cheerio = require("cheerio");
const rp = require("request-promise");

const thenationHome = async () => {
	tn_homeNewsArray = [];

	const response = await rp({
		uri: `https://thenationonlineng.net/category/news/`,
		headers: {
			"User-Agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36",
		},
		gzip: true,
	});

	const $ = cheerio.load(response);
	const currentNews = $(".jeg_posts.jeg_load_more_flag article");

	currentNews.each((i, el) => {
		newsPaper = "The nation";
		currentNewsImg = $(el)
			.find(".jeg_thumb a .thumbnail-container.animate-lazy.size-715  img")
			.attr("data-src");
		currentNewsTitle = $(el).find(".jeg_postblock_content h3 a").text();
		currentNewsLink = $(el).find(".jeg_postblock_content h3 a").attr("href");
		currentNewsDesc = $(el)
			.find(".jeg_postblock_content .jeg_post_excerpt p")
			.text();
		currentNewsDate = $(el)
			.find(".jeg_postblock_content .jeg_post_meta .jeg_meta_date a")
			.text();
		currentNewsTime = $(el)
			.find(".rtp-post-content header span .rtp-meta-time")
			.text();

		randomTime = Math.floor(Math.random() * 100);
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, "0");
		let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
		let yyyy = today.getFullYear();

		today = mm + "/" + dd + "/" + yyyy;
		newdate = Date.parse(today);
		getTime = newdate + randomTime;

		tn_homeNewsArray.push({
			newsPaper,
			currentNewsImg,
			currentNewsTitle,
			currentNewsLink,
			currentNewsDesc,
			currentNewsDate,
			currentNewsTime,
			getTime,
		});
	});
	return tn_homeNewsArray;
};

module.exports = thenationHome;
