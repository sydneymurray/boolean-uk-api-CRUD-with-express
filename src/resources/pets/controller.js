// No need to import the Pet model just the db
const { response } = require("express");
const db = require("../../utils/database");
const Pet = require("./model")
const {createOnePet, updateOnePet, deleteOnePet, retrieveAllPets} = Pet()


function createOne(req, res){
  newPet = createOnePet(req.body)
    .then(newPet => res.json({newPet}))
}

function updateOne(req, res){
  updateOnePet(req.body, req.params.id, pet => res.json({pet}))
}

function deleteOne(req, res){
  deleteOnePet(req.params.id, pet => res.json({pet}))
}

function retrieveAll(req, res){
  retrieveAllPets(pets => res.json({pets}))
}


module.exports = {createOne, deleteOne, updateOne, retrieveAll}