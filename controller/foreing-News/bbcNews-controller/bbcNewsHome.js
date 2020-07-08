const cheerio = require("cheerio");
const rp = require("request-promise");

const bbcNewsHome = async () => {
	bbc_homeNewsArray = [];

	const response = await rp({
		url: "https://www.bbc.com/news/world",
	});

	const $ = cheerio.load(response);
	const currentNews = $(
		".nw-c-seven-slice.gel-layout.gel-layout--equal.b-pw-1280"
	)
		.children()
		.last()
		.children()
		.children()
		.last()
		.siblings();

	const currentNews2 = $(".gel-wrap.gs-u-box-size")
		.children()
		.eq(2)
		.children()
		.eq(1)
		.children()
		.last()
		.siblings();

	currentNews.each((i, el) => {
		(url = "https://www.bbc.com/news/world"), (newsPaper = "BBC");
		logo =
			"https://pbs.twimg.com/profile_images/1150716997254209536/M7gkjsv5_400x400.jpg";
		currentNewsTitle = $(el)
			.find(
				" div a.gs-c-promo-heading.gs-o-faux-block-link__overlay-link.gel-pica-bold.nw-o-link-split__anchor h3.gs-c-promo-heading__title.gel-pica-bold.nw-o-link-split__text"
			)
			.text();
		currentNewsImg = $(el)
			.find("div img")
			.attr("data-src")
			.replace("{width}", "720");
		currentNewsLink1 = $(el).find("div div div div a").attr("href");
		currentNewsDesc = $(el).find("div div div div p").text();
		currentNewsTime = $(el).find("ul li span time span.gs-u-vh").text();
		currentNewsLocation = $(el).find("ul li a span").text();

		currentNewsLink = url + currentNewsLink1;

		randomTime = Math.floor(Math.random() * 1000000);
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, "0");
		let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
		let yyyy = today.getFullYear();

		today = mm + "/" + dd + "/" + yyyy;
		newdate = Date.parse(today);
		getTime = newdate + randomTime;

		bbc_homeNewsArray.push({
			newsPaper,
			logo,
			currentNewsTitle,
			currentNewsImg,
			currentNewsLink,
			currentNewsLocation,
			currentNewsDesc,
			currentNewsTime,
			getTime,
		});
		return bbc_homeNewsArray;
	});

	currentNews2.each((i, el) => {
		url = "https://www.bbc.com";
		newsPaper = "BBC";
		logo =
			"https://pbs.twimg.com/profile_images/1150716997254209536/M7gkjsv5_400x400.jpg";
		currentNewsTitle = $(el)
			.find(
				" div a.gs-c-promo-heading.gs-o-faux-block-link__overlay-link.gel-pica-bold.nw-o-link-split__anchor h3.gs-c-promo-heading__title.gel-pica-bold.nw-o-link-split__text"
			)
			.text();
		currentNewsImg = $(el)
			.find("div img")
			.attr("data-src")
			.replace("{width}", "720");
		currentNewsLink1 = $(el).find("div div div div a").attr("href");
		currentNewsDesc = $(el).find("div div div div p").text();
		currentNewsTime = $(el).find("time span.gs-u-vh").text();
		currentNewsLocation = $(el).find("a span").text();

		currentNewsLink = url + currentNewsLink1;

		randomTime = Math.floor(Math.random() * 1000000);
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, "0");
		let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
		let yyyy = today.getFullYear();

		today = mm + "/" + dd + "/" + yyyy;
		newdate = Date.parse(today);
		getTime = newdate + randomTime;

		bbc_homeNewsArray.push({
			newsPaper,
			logo,
			currentNewsTitle,
			currentNewsImg,
			currentNewsLink,
			currentNewsLocation,
			currentNewsDesc,
			currentNewsTime,
			getTime,
		});
		return bbc_homeNewsArray;
	});
	return bbc_homeNewsArray;
};

module.exports = bbcNewsHome;
