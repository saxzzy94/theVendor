const express = require("express");
const router = express.Router();
const vanguardController = require("../controller/vanguard-controller/vanguardController");

router.route("/").get(vanguardController);

module.exports = router;
