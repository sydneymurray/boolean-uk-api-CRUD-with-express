const express = require("express")  
const booksController = require("./controller")

const booksRouter = express.Router()
//const Book = require("./model")

booksRouter.get("/", (req, resp) => {
    resp.json({OK: true})
    }
)

booksRouter.post("/", booksController.createOne)

booksRouter.patch("/:id", (req, resp) => {

    }
)

module.exports = booksRouter