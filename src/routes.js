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
  // ROUTE EDIT BOOKS BY ID
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: editBookByIdHandler,
  },
  // ROUTE DELETE BOOKS BY ID
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;
