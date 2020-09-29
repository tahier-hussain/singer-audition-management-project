const express = require("express");
const router = express.Router();
const SingerLoginController = require("../../controllers/singer-login");

router.post("/", SingerLoginController.login);

module.exports = router;
