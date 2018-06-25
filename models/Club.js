const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clubSchema = new Schema({
  clubname: String
});

const Club = mongoose.model("Club", clubSchema);
module.exports = Club;
