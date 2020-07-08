const express = require("express");
const router = express.Router();
const thisdayController = require("../../../controller/Nigerian-News/thisday-controller/thisdayController");

router.route("/").get(thisdayController);

module.exports = router;
