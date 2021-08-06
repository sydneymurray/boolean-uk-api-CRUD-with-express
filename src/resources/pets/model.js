const db = require("../../utils/database");
const { buildAnimalDatabase } = require("../../utils/mockData");

function Pet() {
  function createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS pets (
        id        SERIAL        PRIMARY KEY,
        name      VARCHAR(255)   NOT NULL,
        age       INTEGER       NOT NULL,
        type      VARCHAR(255)   NOT NULL,
        breed     VARCHAR(255)   NOT NULL,
        microchip BOOLEAN       NOT NULL
      );
    `;

    db.query(sql)
      .then((result) => console.log("[DB] Pet table ready."))
      .catch(console.error);
  }

  function mockData() {
    const createPet = `
      INSERT INTO pets
        (name, age, type, breed, microchip)
      VALUES
        ($1, $2, $3, $4, $5)
    `;

    const pets = buildAnimalDatabase();
    pets.forEach((pet) => {
      db.query(createPet, Object.values(pet)).catch(console.error);
    });
  }

  async function createOnePet(newPet){
    let {name, age, type, breed, microchip} = newPet
    let sql = `
      INSERT INTO pets
        (name, age, type, breed, microchip)
      VALUES
        ($1, $2, $3, $4, $5)
      RETURNING *;
      `
    let dbResponse = await db.query(sql, [name, age, type, breed, microchip])
    return dbResponse.rows[0]
  } 

  function updateOnePet(pet, petId, callbackFunction){
    let {name, age, type, breed, microchip} = pet
    let sql = `
      UPDATE pets
      SET name = $1, age = $2, type = $3, breed = $4, microchip = $5
      WHERE id = $6
      RETURNING *;
    `
    db.query(sql, [name, age, type, breed, microchip, Number(petId)])
      .then(dbResponse => callbackFunction(dbResponse.rows[0]))
  }

  function deleteOnePet(petId, callbackFunction){
    let sql = `
      DELETE FROM pets WHERE id = $1
      RETURNING *;
    `
    db.query(sql, [Number(petId)])
      .then(dbResponse => callbackFunction(dbResponse.rows[0]))
  }

  function retrieveAllPets(callbackFunction){
    let sql = `
      SELECT * FROM pets;
    `
    db.query(sql)
      .then(dbResponse => callbackFunction(dbResponse.rows))
      .catch(error => console.log(error))
  }

  createTable();
  mockData();
  return {createOnePet, updateOnePet, deleteOnePet, retrieveAllPets}
}

module.exports = Pet;

