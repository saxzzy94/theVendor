const cheerio = require("cheerio");
const rp = require("request-promise");

const punchHome = async () => {
	p_homeNews = [];
	const response1 = await rp({
		uri: "https://punchng.com/all-posts",
	});

	const $$ = cheerio.load(response1);
	const currentNewsElement = $$(".items.col-sm-12");

	currentNewsElement.each((i, el) => {
		newsPaper = "Punch";
		backgroundImage = $$(el)
			.find("a .filler div .blurry")
			.css("background-image");
		currentNewsTitle = $$(el).find("a .filler div h2").text();
		currentNewsLink = $$(el).find("a").attr("href");
		currentNewsDesc = $$(el).find(".seg-summary p").text();
		currentNewsDate1 = $$(el).find(".seg-time").text();

		currentNewsDate = currentNewsDate1.substring(
			1,
			currentNewsDate1.length - 1
		);

		currentNewsImg =
			backgroundImage.substring(5, backgroundImage.length - 12) + ".jpg";
		currentNewsImg2 =
			backgroundImage.substring(5, backgroundImage.length - 12) + ".png";

		randomTime = Math.floor(Math.random() * 100);
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, "0");
		let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
		let yyyy = today.getFullYear();

		today = mm + "/" + dd + "/" + yyyy;
		newdate = Date.parse(today);
		getTime = newdate + randomTime;

		p_homeNews.push({
			newsPaper,
			currentNewsImg,
			currentNewsImg2,
			currentNewsTitle,
			currentNewsLink,
			currentNewsDesc,
			currentNewsDate,
			getTime,
		});
	});
	return p_homeNews;
};

module.exports = punchHome;
