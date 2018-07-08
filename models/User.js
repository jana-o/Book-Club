const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, unique: true },
    password: String,
    facebookID: String,
    email: { type: String, unique: true },
    clubs: [{ type: Schema.Types.ObjectId, ref: "Club" }],
    favoriteBooks: [{ type: Schema.Types.ObjectId, ref: "Book" }],
    icon: String,
    confirmationStatus: { type: String, default: "awaiting" },
    confirmationLink: { type: String }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    },
    usePushEach: true
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
