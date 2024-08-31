const db = require('../config/db.config.js');
const Book = db.Book;

exports.create = (req, res) => {
  let book = {};

  try {
    book.name = req.body.name;
    book.publisher = req.body.publisher;
    book.author = req.body.author;
    book.genre = req.body.genre;
    book.authorCountry = req.body.authorCountry;
    book.pageNumber = req.body.pageNumber;
    book.publicationYear = req.body.publicationYear;
    book.price = req.body.price;

    Book.create(book).then(result => {
      res.status(200).json({
        message: "Libro creado con éxito con id = " + result.id,
        book: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "¡Falló!",
      error: error.message
    });
  }
}

exports.retrieveAllBooks = (req, res) => {
  Book.findAll()
    .then(bookInfos => {
      res.status(200).json({
        message: "¡Se obtuvieron todos los libros con éxito!",
        books: bookInfos
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "¡Error!",
        error: error
      });
    });
}

exports.getBookById = (req, res) => {
  let bookId = req.params.id;
  Book.findByPk(bookId)
    .then(book => {
      res.status(200).json({
        message: "Se obtuvo con éxito el libro con id = " + bookId,
        book: book
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "¡Error!",
        error: error
      });
    });
}

exports.filteringByAuthor = (req, res) => {
  let author = req.query.author;

  Book.findAll({
    attributes: ['id', 'name', 'publisher', 'author', 'genre', 'authorCountry', 'pageNumber', 'publicationYear', 'price'],
    where: { author: author }
  })
    .then(results => {
      res.status(200).json({
        message: "Se obtuvieron todos los libros del autor = " + author,
        books: results,
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "¡Error!",
        error: error
      });
    });
}

exports.pagination = (req, res) => {
  try {
    let page = parseInt(req.query.page) || 0;
    let limit = parseInt(req.query.limit) || 10;

    const offset = page * limit;

    Book.findAndCountAll({ limit: limit, offset: offset })
      .then(data => {
        const totalPages = Math.ceil(data.count / limit);
        const response = {
          message: "¡La paginación se completó! Parámetros de consulta: página = " + page + ", límite = " + limit,
          data: {
            "totalItems": data.count,
            "totalPages": totalPages,
            "limit": limit,
            "currentPageNumber": page + 1,
            "currentPageSize": data.rows.length,
            "books": data.rows
          }
        };
        res.send(response);
      });
  } catch (error) {
    res.status(500).send({
      message: "Error -> No se puede completar la solicitud de paginación.",
      error: error.message,
    });
  }
}

exports.pagingFilteringSorting = (req, res) => {
  try {
    let page = parseInt(req.query.page) || 0;
    let limit = parseInt(req.query.limit) || 10;
    let author = req.query.author;

    const offset = page * limit;

    Book.findAndCountAll({
      attributes: ['id', 'name', 'publisher', 'author', 'genre', 'authorCountry', 'pageNumber', 'publicationYear', 'price'],
      where: author ? { author: author } : {},
      order: [['name', 'ASC']],
      limit: limit,
      offset: offset
    })
      .then(data => {
        const totalPages = Math.ceil(data.count / limit);
        const response = {
          message: "La solicitud de paginación, filtrado y ordenación se completó. Parámetros de consulta: página = " + page + ", límite = " + limit + ", autor = " + author,
          data: {
            "totalItems": data.count,
            "totalPages": totalPages,
            "limit": limit,
            "author-filtering": author,
            "currentPageNumber": page + 1,
            "currentPageSize": data.rows.length,
            "books": data.rows
          }
        };
        res.send(response);
      });
  } catch (error) {
    res.status(500).send({
      message: "Error -> No se puede completar la solicitud de paginación.",
      error: error.message,
    });
  }
}

exports.updateById = async (req, res) => {
  try {
    let bookId = req.params.id;
    let book = await Book.findByPk(bookId);

    if (!book) {
      res.status(404).json({
        message: "No se encontró el libro para actualizar con id = " + bookId,
        book: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        name: req.body.name,
        publisher: req.body.publisher,
        author: req.body.author,
        genre: req.body.genre,
        authorCountry: req.body.authorCountry,
        pageNumber: req.body.pageNumber,
        publicationYear: req.body.publicationYear,
        price: req.body.price
      }
      let result = await Book.update(updatedObject, { returning: true, where: { id: bookId } });

      if (!result[0]) {
        res.status(500).json({
          message: "Error -> No se puede actualizar el libro con id = " + req.params.id,
          error: "No se pudo actualizar",
        });
      }

      res.status(200).json({
        message: "Actualización exitosa del libro con id = " + bookId,
        book: updatedObject,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar el libro con id = " + req.params.id,
      error: error.message
    });
  }
}

exports.deleteById = async (req, res) => {
  try {
    let bookId = req.params.id;
    let book = await Book.findByPk(bookId);

    if (!book) {
      res.status(404).json({
        message: "No existe un libro con id = " + bookId,
        error: "404",
      });
    } else {
      await book.destroy();
      res.status(200).json({
        message: "Eliminación exitosa del libro con id = " + bookId,
        book: book,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar el libro con id = " + req.params.id,
      error: error.message,
    });
  }
}
