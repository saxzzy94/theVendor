const express = require("express");
const app = express();
const vanguard = require("./routes/Nigerian-News/localNews/vanguard");
const punch = require("./routes/Nigerian-News/localNews/punch");
const thisday = require("./routes/Nigerian-News/localNews/thisday");
const thenation = require("./routes/Nigerian-News/localNews/thenation");
const local = require("./routes/Nigerian-News/landing");
const foreign = require("./routes/foreign-News/landing");
const sport = require("./routes/sport/landing");

const cors = require("cors");

const port = process.env.PORT || 5000;
app.use(cors());

app.use("/", local);
app.use("/foreign", foreign);
app.use("/sport", sport);
app.use("/news/vanguard", vanguard);
app.use("/news/punch", punch);
app.use("/news/thisday", thisday);
app.use("/news/thenation", thenation);

app.listen(port, () => console.log(`app is listening on port ${port}`));
