const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    googleId: { type: String, unique: true },
    title: String,
    author: String,
    clubs: [{ type: Schema.Types.ObjectId, ref: "Club" }],
    icon: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    },
    usePushEach: true
  }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
