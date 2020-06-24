const express = require("express");
const router = express.Router();
const homee = require("./homee");

router.route("/").get(homee);

module.exports = router;
