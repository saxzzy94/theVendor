const cheerio = require("cheerio");
const rp = require("request-promise");

const bbcSport = (async () => {
	bbc_homeNewsArray = [];

	const response = await rp({
		uri: "https://www.bbc.com/sport",
	});

	const $ = cheerio.load(response);
	const News = $(".sp-c-cluster").children().children();
	currrentNews.each((i, el) => {
		url = "https://www.bbc.com/";
		newsPaper = "BBC";
		logo =
			"https://pbs.twimg.com/profile_images/1150716997254209536/M7gkjsv5_400x400.jpg";

		currrentNewsImg1 = $(el).find("div img").attr("data-src");

		currrentNewsTitle1 = $(el).find("a h3").text();
		currrentNewsLink1 = $(el).find("div div div div a").attr("href");
		currrentNewsDesc = $(el).find("div div div div p").text();
		currrentNewsTime = $(el).find("ul li span time span.gs-u-vh").text();
		currrentNewsLocation = $(el)
			.find(".gs-u-align-middle.gs-o-section-tag.gel-brevier.qa-section-tag a")
			.text();

		randomTime = Math.floor(Math.random() * 1000000);
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, "0");
		let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
		let yyyy = today.getFullYear();

		today = mm + "/" + dd + "/" + yyyy;
		currrentNewdate = Date.parse(today);
		getTime = newdate + randomTime;

		if (NewsImg1 === undefined) {
			currrentNewsImg1 = "";
		} else {
			currrentNewsImg = NewsImg1.replace("{width}", "720");
		}

		if (NewsTitle1 === "") {
			currrentNewsTitle1 = undefined;
		} else {
			currrentNewsTitle = NewsTitle1;
		}

		if (NewsLink1 === "") {
			currrentNewsLink1 = undefined;
		} else {
			currrentNewsLink = url + NewsLink1;
		}

		bbc_homeNewsArray.push({
			// newsPaper,
			// logo,
			currrentNewsTitle,
			currrentNewsImg,
			currrentNewsLink,
			currrentNewsLocation,
			//NewsDesc,
			currrentNewsTime,
			getTime,
		});

		return bbc_homeNewsArray;
	});

	// Filter the Array

	let result = bbc_homeNewsArray.reduce((unique, o) => {
		if (
			!unique.some(
				obj => obj.NewsTitle === o.NewsTitle && obj.NewsImg === o.NewsImg
			)
		) {
			unique.push(o);
		}
		return unique;
	}, []);
	console.log(result);
})();

module.exports = bbcSport;
