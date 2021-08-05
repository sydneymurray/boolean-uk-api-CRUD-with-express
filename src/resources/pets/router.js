const express = require("express")  
const petsController = require("./controller")

const petsRouter = express.Router()
//const Book = require("./model")

petsRouter.get("/", (req, resp) => {
    resp.json({OK: true})
    }
)

petsRouter.post("/", petsController.createOne)

petsRouter.patch("/:id", (req, resp) => {

    }
)

module.exports = petsRouter