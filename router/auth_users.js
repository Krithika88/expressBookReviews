const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const bodyparser = require('body-parser')

let users = [];
var urlencodedParser = bodyparser.urlencoded({extended:false})


const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    if(users.includes(username))
    {
      return false
    } else {
      return true
    }

}

const authenticatedUser = (username,password)=>{ //returns boolean
  if(users.includes(username)) {
    return true
  }
}

//only registered users can login
regd_users.post("/login", urlencodedParser, (req,res) => {
  const {username, password} = req.body
   if(username === "Krithika" && password === "secret") {
    session = req.session
    let token = jwt.sign({user:username}, "JWT_SECRET")
    session.token = token
    session.username = username
    return res.status(200).json({
      message : session
    });

}
});

// Add a book review
regd_users.put("/auth/review/:isbn", urlencodedParser, (req, res) => {
  const review = req.body.review
  const isbn = req.params.isbn
  let keys = Object.keys(books);
   for( var i = 0,length = keys.length; i < length; i++ ) {
   const bookDetail = (books[ keys[ i ] ]);
   bookDetail.reviews = {Krithika: review};
   return res.status(200).json({
      message : bookDetail
    });
  }

});

// Delete a book review
regd_users.delete("/auth/review/:isbn", urlencodedParser, (req, res) => {
  const isbn = req.params.isbn
  let keys = Object.keys(books);
   for( var i = 0,length = keys.length; i < length; i++ ) {
   const bookDetail = (books[ keys[ i ] ]);
   bookDetail.reviews = {};
   return res.status(200).json({
      message : bookDetail
    });
  }
  

});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
