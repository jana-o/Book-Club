const mongoose = require("mongoose");
const Club = require("../models/Club");

const dbName = "project-2---book-club";
mongoose.connect(`mongodb://localhost/${dbName}`);
Club.collection.drop();

const clubs = [
  {
    clubname: `Entrepreneur Reading Circle`,
    genre: `Business`,
    user: [],
    currBook: {
      title: `The 4-Hour Work Week`,
      author: `Tim Ferriss`,
      ISBN: 9781446490594
    },
    prevBooks: [
      {
        title: `Think and Grow Rich`,
        author: `Napoleon Hill`,
        ISBN: 9781627938204
      }
    ],
    icon: `/images/books.png`
  },
  {
    clubname: `Self-Improvement Club`,
    genre: `Self-Improvement`,
    user: [],
    currBook: {
      title: `The Slight Edge`,
      author: `Jeff Olson`,
      ISBN: 9781626340473
    },
    prevBooks: [
      {
        title: `How to Win Friends and Influence People`,
        author: `Dale Carnegie`,
        ISBN: 9781409005216
      }
    ],
    icon: `/images/books2.png`
  },
  {
    clubname: `Popular Economics`,
    genre: `Economics`,
    user: [],
    currBook: {
      title: `Freakonomics`,
      author: `Steven D. Levitt`,
      ISBN: 9780141928739
    },
    prevBooks: [
      {
        title: `Thinking, Fast and Slow`,
        author: `Daniel Kahneman`,
        ISBN: 9780141918921
      }
    ],
    icon: `/images/books.png`
  },
  {
    clubname: `Crime/ Mystery Club`,
    genre: `Crime`,
    user: [],
    currBook: {
      title: `Murder on the Orient Express`,
      author: `Agatha Christie`,
      ISBN: 9780007422579
    },
    prevBooks: [
      {
        title: `The Big Sleep`,
        author: `Raymond Chandler`,
        ISBN: 9780394758282
      }
    ],
    icon: `/images/books2.png`
  },
  {
    clubname: `High Fantasy Fan Club`,
    genre: `Fantasy`,
    user: [],
    currBook: {
      title: `The Fellowship of the Ring`,
      author: `J. R. R. Tolkien`,
      ISBN: 9780007322497
    },
    prevBooks: [
      {
        title: `A Wizard of Earthsea`,
        author: `Ursula K. Le Guin`,
        ISBN: 9781473208452
      }
    ],
    icon: `/images/books2.png`
  }
];

Club.create(clubs, err => {
  if (err) {
    throw err;
  }

  mongoose.connection.close();
});