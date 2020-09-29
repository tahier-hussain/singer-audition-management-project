const express = require("express");
const router = express.Router();
const songsController = require("../../controllers/songs");
const auth = require("../../middleware/auth");

router.post("/add", auth, songsController.create);

router.get("/get", songsController.get);

router.post("/get-singer-songs", auth, songsController.getSingerSongs);

router.put("/update-song", auth, songsController.update);

router.delete("/delete-song", auth, songsController.delete);

module.exports = router;
