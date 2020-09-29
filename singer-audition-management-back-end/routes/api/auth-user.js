const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth-user");
const auth = require("../../middleware/auth");

router.get("/get", auth, authController.get);

router.get("/get-singers", authController.getSingers);

router.post("/singer-details", auth, authController.singerDetails);

router.post("/select-singer", auth, authController.selectSinger);

router.post("/reject-singer", auth, authController.rejectSinger);

module.exports = router;
