const { nanoid } = require("nanoid");
const bookshelfs = require("./bookshelfs");

// HANDLER ADD BOOK
const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBookshelf = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if (name === null || name === undefined || name === "") {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  bookshelfs.push(newBookshelf);

  const isSuccess =
    bookshelfs.filter((bookshelf) => bookshelf.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "error",
    message: "Buku gagal ditambahkan",
  });
  response.code(500);
  return response;
};

// HANDLER GET ALL BOOKS
const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  if (name !== undefined) {
    const response = h.response({
      status: "success",
      data: {
        books: bookshelfs
          .filter((bookshelf) =>
            bookshelf.name.toLowerCase().includes(name.toLowerCase())
          )
          .map((bookshelf) => ({
            id: bookshelf.id,
            name: bookshelf.name,
            publisher: bookshelf.publisher,
          })),
      },
    });
    response.code(200);
    return response;
  }

  if (reading !== undefined) {
    const response = h.response({
      status: "success",
      data: {
        books: bookshelfs
          .filter((bookshelf) => Number(bookshelf.reading) === Number(reading))
          .map((bookshelf) => ({
            id: bookshelf.id,
            name: bookshelf.name,
            publisher: bookshelf.publisher,
          })),
      },
    });
    response.code(200);
    return response;
  }

  if (finished !== undefined) {
    const response = h.response({
      status: "success",
      data: {
        books: bookshelfs
          .filter(
            (bookshelf) => Number(bookshelf.finished) === Number(finished)
          )
          .map((bookshelf) => ({
            id: bookshelf.id,
            name: bookshelf.name,
            publisher: bookshelf.publisher,
          })),
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "success",
    data: {
      books: bookshelfs.map((bookshelf) => ({
        id: bookshelf.id,
        name: bookshelf.name,
        publisher: bookshelf.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

// HANDLER GET BOOK BY ID DETAIL
const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = bookshelfs.filter((book) => book.id === bookId)[0];

  if (book !== undefined) {
    return {
      status: "success",
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

// HANDLER EDIT BOOK BY ID
const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();
  const index = bookshelfs.findIndex((bookshelf) => bookshelf.id === bookId);

  if (name === null || name === undefined || name === "") {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  if (index !== -1) {
    bookshelfs[index] = {
      ...bookshelfs[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

// HANDLER DELETE BOOK BY ID
const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const index = bookshelfs.findIndex((bookshelf) => bookshelf.id === bookId);

  if (index !== -1) {
    bookshelfs.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
