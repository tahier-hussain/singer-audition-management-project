const express = require("express");
const router = express.Router();
const SingerRegisterController = require("../../controllers/singer-register");

router.post("/", SingerRegisterController.register);

module.exports = router;
