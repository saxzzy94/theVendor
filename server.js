const express = require("express");
const app = express();
const vanguard = require("./routes/vanguard");
const punch = require("./routes/punch");
const thisday = require("./routes/thisday");
const thenation = require("./routes/thenation");
const landing = require("./routes/landing");

const cors = require("cors");

const port = process.env.PORT || 5000;
app.use(cors());

app.use("/", landing);
app.use("/news/vanguard", vanguard);
app.use("/news/punch", punch);
app.use("/news/thisday", thisday);
app.use("/news/thenation", thenation);

app.listen(port, () => console.log(`app is listening on port ${port}`));
