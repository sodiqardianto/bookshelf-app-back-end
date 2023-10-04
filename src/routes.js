const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
} = require("./handler");

const routes = [
  // ROUTE ADD BOOK
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
  // ROUTE GET ALL BOOKS
  {
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler,
  },
  // ROUTE GET BOOKS BY ID
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBookByIdHandler,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: editBookByIdHandler,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;
