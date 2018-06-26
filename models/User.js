const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, unique: true },
    password: String,
    facebookID: String,
    email: { type: String, unique: true },
    clubs: [{type: Schema.Types.ObjectId, ref: 'Club'}],
    books: [{type: Object}],
    icon: String
  },
  {   
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
