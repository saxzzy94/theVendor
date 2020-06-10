const express = require("express");
const router = express.Router();
const thisdayController = require("../controller/thisday-controller/thisdayController");

router.route("/").get(thisdayController);

module.exports = router;
