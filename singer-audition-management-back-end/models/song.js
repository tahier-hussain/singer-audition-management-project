const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const SongSchema = new Schema({
  singer_id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  song: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Song = mongoose.model("song", SongSchema);
