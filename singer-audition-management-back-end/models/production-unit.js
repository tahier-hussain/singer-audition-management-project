const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ProductionUnitSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
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

module.exports = ProductionUnit = mongoose.model("production-user", ProductionUnitSchema);
