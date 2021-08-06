const express = require("express")  
const booksController = require("./controller")

const booksRouter = express.Router()

booksRouter.get("/", booksController.retrieveAll)

booksRouter.post("/", booksController.createOne)

booksRouter.patch("/:id", booksController.updateOne)

booksRouter.delete("/:id", booksController.deleteOne)

module.exports = booksRouter