module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define('book', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(60), // Nombre del libro, texto de hasta 60 caracteres
      allowNull: false
    },
    publisher: {
      type: Sequelize.STRING(25) // Editorial, texto de hasta 25 caracteres
    },
    author: {
      type: Sequelize.STRING(25), // Autor, texto de hasta 25 caracteres
      allowNull: false
    },
    genre: {
      type: Sequelize.STRING(20) // Género, texto de hasta 20 caracteres
    },
    authorCountry: {
      type: Sequelize.STRING(20) // País del autor, texto de hasta 20 caracteres
    },
    pageNumber: {
      type: Sequelize.INTEGER // Número de páginas, entero
    },
    publicationYear: {
      type: Sequelize.DATE // Año de edición, fecha
    },
    price: {
      type: Sequelize.DECIMAL(10, 2) // Precio, moneda (con 10 dígitos en total y 2 decimales)
    }
  });

  return Book;
}
