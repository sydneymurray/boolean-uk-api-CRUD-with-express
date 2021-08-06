const express = require("express")  
const petsController = require("./controller")

const petsRouter = express.Router()

petsRouter.get("/", petsController.retrieveAll)

petsRouter.post("/", petsController.createOne)

petsRouter.patch("/:id", petsController.updateOne)

petsRouter.delete("/:id", petsController.deleteOne)

module.exports = petsRouter