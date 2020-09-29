const express = require("express");
const router = express.Router();
const ProductionUnitLoginController = require("../../controllers/production-unit-login");

router.post("/", ProductionUnitLoginController.login);

module.exports = router;
