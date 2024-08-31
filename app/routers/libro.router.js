const express = require('express');
const router = express.Router();
const books = require('../controllers/libro.controller.js');

// Crear un libro
router.post('/api/books/create', books.create);

// Obtener todos los libros
router.get('/api/books/all', books.retrieveAllBooks);

// Obtener un libro por su ID
router.get('/api/books/onebyid/:id', books.getBookById);

// Filtrar libros por autor
router.get('/api/books/filteringbyauthor', books.filteringByAuthor);

// Paginación de libros
router.get('/api/books/pagination', books.pagination);

// Paginación, filtrado y ordenación de libros
router.get('/api/books/pagefiltersort', books.pagingFilteringSorting);

// Actualizar un libro por su ID
router.put('/api/books/update/:id', books.updateById);

// Eliminar un libro por su ID
router.delete('/api/books/delete/:id', books.deleteById);

module.exports = router;
