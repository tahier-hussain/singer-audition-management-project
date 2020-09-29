const express = require("express");
const router = express.Router();
const ProductionUnitRegisterController = require("../../controllers/production-unit-register");

router.post("/", ProductionUnitRegisterController.register);

module.exports = router;
