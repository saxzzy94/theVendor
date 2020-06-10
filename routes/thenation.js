const express = require("express");
const router = express.Router();
const thenationController = require("../controller/thenation-controller/thenationController");

router.route("/").get(thenationController);

module.exports = router;
