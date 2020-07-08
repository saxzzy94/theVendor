const cheerio = require("cheerio");
const rp = require("request-promise");

const thenationController = async (req, res) => {
	try {
		currentNewsArray = [];
		latestNewsArray = [];
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
		const latestNews = $(
			"#jnews_module_block_28-2 div div .jeg_postsmall.jeg_load_more_flag article"
		);
		currentNews.each((i, el) => {
			currentNewsImg1 = $(el)
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

			currentNewsImg = currentNewsImg1.replace("-350x250", "");

			const currentNews = {
				currentNewsImg,
				currentNewsTitle,
				currentNewsLink,
				currentNewsDesc,
				currentNewsDate,
				currentNewsTime,
			};
			currentNewsArray.push(currentNews);
			return currentNewsArray;
		});
		latestNews.each((i, el) => {
			latestNewsTitle = $(el).find(".jeg_postblock_content h3 a").text();
			latestNewsTime = $(el)
				.find(".jeg_postblock_content .jeg_post_meta .jeg_meta_date a")
				.text();
			latestNewsLink = $(".jeg_postblock_content h3 a").attr("href");

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

module.exports = thenationController;
