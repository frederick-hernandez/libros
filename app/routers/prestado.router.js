const express = require('express');
const router = express.Router();
const books = require('../controllers/prestado.controller.js');

// Crear un libro
router.post('/api/prestado/create', books.create);

// Obtener todos los libros
router.get('/api/prestado/all', books.retrieveAllBooks);

// Obtener un libro por su ID
router.get('/api/prestado/onebyid/:id', books.getBookById);

// Filtrar libros por autor
router.get('/api/prestado/filteringbyauthor', books.filteringByAuthor);

// Paginación de libros
router.get('/api/prestado/pagination', books.pagination);

// Paginación, filtrado y ordenación de libros
router.get('/api/prestado/pagefiltersort', books.pagingFilteringSorting);

// Actualizar un libro por su ID
router.put('/api/prestado/update/:id', books.updateById);

// Eliminar un libro por su ID
router.delete('/api/prestado/delete/:id', books.deleteById);

module.exports = router;
