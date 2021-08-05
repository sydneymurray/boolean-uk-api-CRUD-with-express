// No need to import the Book model just the db
const { response } = require("express");
const db = require("../../utils/database");
const Book = require("./model")
const {createOneBook} = Book ()


function createOne(req, res){
  createOneBook(req.body, newBook => res.json({newBook}))
}

module.exports = {createOne}