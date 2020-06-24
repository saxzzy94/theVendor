const express = require("express");
const router = express.Router();
const punchController = require("../controller/punch-controller/punchController");

router.route("/").get(punchController);

module.exports = router;
