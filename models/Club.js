const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clubSchema = new Schema(
  {
    clubname: { type: String, unique: true },
    genre: String,
    user: [{type: Schema.Types.ObjectId, ref: 'User'}],
    currBook: Object,
    prevBooks: [{type: Object}],
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
