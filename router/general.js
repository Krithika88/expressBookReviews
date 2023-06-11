const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
   let username=  req.params.username
   let password = req.params.password
   if(isValid(username)) {
    users.push(username)
    return res.status(200).json({message: "User successfully registered"});
   } else {
  return res.status(500).json({message: "User already exist"});
}
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  const methcall = new Promise((resolve, reject) => {
    resolve(books)
  });
  methcall.then (
    (books) =>  {
      return res.status(200).json(books);
  });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const methcall = new Promise((resolve, reject) => {
    const isbn = req.params.isbn
    var keys = Object.keys(books);
    resolve(books[keys[isbn]]);
  });
  
  methcall.then (
    (bookDetail) =>  {
      return res.status(200).json(bookDetail);
  });
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {

  const methcall = new Promise((resolve, reject) => {
      const authorName = req.params.author
     var keys = Object.keys(books);
      for( var i = 0,length = keys.length; i < length; i++ ) {
         const bookDetail = (books[ keys[ i ] ]);
         if(bookDetail.author === authorName) {
      resolve(bookDetail);
    }
  }
  });
    methcall.then (
      (bookDetail) =>  {
        return res.status(200).json(bookDetail);
    });
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const methcall = new Promise((resolve, reject) => {
  const title = req.params.title
   var keys = Object.keys(books);
   for( var i = 0,length = keys.length; i < length; i++ ) {
       const bookDetail = (books[ keys[ i ] ]);
       if(bookDetail.title === title) {
         resolve(bookDetail);
       }
   }
});
  methcall.then (
      (bookDetail) =>  {
        return res.status(200).json(bookDetail);
    });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn
  var keys = Object.keys(books);
  for( var i = 0,length = keys.length; i < length; i++ ) {
       let key = keys[ i ] ;
       if(key == isbn) {
       const bookDetail = books[key]
      return res.status(200).json(bookDetail.reviews);
    }
}
});

module.exports.general = public_users;
