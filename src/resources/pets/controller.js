// No need to import the Pet model just the db
const { response } = require("express");
const db = require("../../utils/database");
const Pet = require("./model")
const {createOnePet} = Pet()


function createOne(req, res){
  newPet = createOnePet(req.body)
    .then(newPet => res.json({newPet}))
}

module.exports = {createOne}