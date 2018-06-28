const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clubSchema = new Schema(
  {
    clubname: { type: String, unique: true },
    genre: String,
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
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

const Club = mongoose.model("Club", clubSchema);
module.exports = Club;
//change schema: books: [bookId1, bookId2] same as user schema, then curr book is books.length in display
