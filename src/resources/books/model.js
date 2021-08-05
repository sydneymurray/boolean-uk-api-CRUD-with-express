const db = require("../../utils/database");
const { buildBooksDatabase } = require("../../utils/mockData");
const { createOne } = require("./controller");

function Book() {
  function createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS books (
        id              SERIAL        PRIMARY KEY,
        title           VARCHAR(255)   NOT NULL,
        type            VARCHAR(255)   NOT NULL,
        author          VARCHAR(255)   NOT NULL,
        topic           VARCHAR(255)   NOT NULL,
        publicationDate DATE           NOT NULL
      );
    `;

    db.query(sql)
      .then(result => console.log("[DB] Book table ready."))
      .catch(error => console.error(error));
  }

  function mockData() {
    const createBook = `
      INSERT INTO books
        (title, type, author, topic, publicationDate)
      VALUES
        ($1, $2, $3, $4, $5)
    `;

    const books = buildBooksDatabase();
    books.forEach((book) => {
      db.query(createBook, Object.values(book)).catch(console.error);
    });
  }

  function createOneBook(newBook, callbackFunction){
    let {title, type, author, topic, publicationDate} = newBook
    let sql = `
      INSERT INTO books
        (title, type, author, topic, publicationDate)
      VALUES
        ($1, $2, $3, $4, $5)
      RETURNING *;
      `
    db.query(sql, [title, type, author, topic, publicationDate])
      .then(dbResponse => callbackFunction(dbResponse.rows[0]))
  }

  createTable();
  mockData();
  return {createOneBook}
}

module.exports = Book;

/*
Line 7 DROP TABLE books;
*/