const mongoose = require("mongoose");
const Club = require("../models/Club");

const dbName = "project-2---book-club";
mongoose.connect(`mongodb://localhost/${dbName}`);
Club.collection.drop();

const clubs = [
  {
    clubname: `Entrepreneur Reading Circle`,
    genre: `Business`,
    users: [],
    books: [],
    icon: `images/books.png`
  },
  {
    clubname: `Self-Improvement Club`,
    genre: `Self-Improvement`,
    users: [],
    books: [],
    icon: `images/books2.png`
  },
  {
    clubname: `Popular Economics`,
    genre: `Economics`,
    users: [],
    books: [],
    icon: `images/books2.png`
  },
  {
    clubname: `High Fantasy Fan Club`,
    genre: `Fantasy`,
    users: [],
    books: [],
    icon: `images/books2.png`
  }
];

Club.create(clubs, err => {
  if (err) {
    throw err;
  }

  mongoose.connection.close();
});
