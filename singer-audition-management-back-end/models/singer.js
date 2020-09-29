const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const SingerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  family_background: {
    type: String,
    required: true
  },
  journey_to_singer: {
    type: String,
    required: true
  },
  audition_decision_finalised: {
    type: Boolean,
    default: false
  },
  audition_status: {
    type: Boolean,
    default: false
  },
  image: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Singer = mongoose.model("singer", SingerSchema);
