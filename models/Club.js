const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clubSchema = new Schema(
  {
    clubname: { type: String, unique: true },
    genre: String,
    user: Array,
    currBook: Object,
    prevBooks: Array,
    icon: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Club = mongoose.model("Club", clubSchema);
module.exports = Club;
