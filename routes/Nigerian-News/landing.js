const express = require("express");
const router = express.Router();
const home = require("./home");

router.route("/").get(home);

module.exports = router;
