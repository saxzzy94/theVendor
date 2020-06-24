const cheerio = require("cheerio");
const rp = require("request-promise");

const channelsHome = async () => {
	ch_homeNewsArray = [];

	const response = await rp({
		uri: "https://www.channelstv.com/category/local",
	});

	const $ = cheerio.load(response);
	const currentNews = $(".cat_page.panel.panel_lead.panel_default");

	currentNews.each(async (i, el) => {
		try {
			newsPaper = "channels";
			currentNewsImg1 = await $(el).find("a div img").attr("srcset");

			currentNewsTitle = $(el).find(".panel-txt.panel-txt_default h3").text();
			currentNewsLink = $(el).find("a").attr("href");

			randomTime = Math.floor(Math.random() * 100);

			let today = new Date();
			let dd = String(today.getDate()).padStart(2, "0");
			let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
			let yyyy = today.getFullYear();
			today = mm + "/" + dd + "/" + yyyy;

			newdate = Date.parse(today);
			getTime = newdate + randomTime;

			currentNewsImg = currentNewsImg1.substring(
				0,
				currentNewsImg1.indexOf(" ")
			);
		} catch (error) {
			console.log(error);
		}
		ch_homeNewsArray.push({
			newsPaper,
			currentNewsImg,
			currentNewsTitle,
			currentNewsLink,
			getTime,
		});
	});
	return ch_homeNewsArray;
};

module.exports = channelsHome;
