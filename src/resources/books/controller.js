// No need to import the Book model just the db
//const { response } = require("express");
//const db = require("../../utils/database");
const Book = require("./model")
const {createOneBook, updateOneBook, deleteOneBook, retrieveAllBooks} = Book ()


function createOne(req, res){
  createOneBook(req.body, newBook => res.json({newBook}))
}

function updateOne(req, res){
  updateOneBook(req.body, req.params.id, book => res.json({book}))
}

function deleteOne(req, res){
  deleteOneBook(req.params.id, book => res.json({book}))
}

function retrieveAll(req, res){
  retrieveAllBooks(books => res.json({books}))
}

module.exports = {createOne, updateOne, deleteOne, retrieveAll}

