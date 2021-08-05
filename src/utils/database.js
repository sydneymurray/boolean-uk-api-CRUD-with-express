const dotenv = require('dotenv')
dotenv.config()

const { Client } = require("pg");

let connection = process.env.PGURL;

const db = new Client(connection);

console.log(`CONNECTION:- ${connection}`)

module.exports = db;
