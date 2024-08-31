module.exports = (sequelize, Sequelize) => {
    const prestado = sequelize.define('prestado', {
      numero: {
        type: Sequelize.INTEGER, // Autonumérico
        autoIncrement: true,
        primaryKey: true
      },
      codigoDelLibro: {
        type: Sequelize.INTEGER, // Código del libro, numérico byte
        allowNull: false
      },
      codigoDelUsuario: {
        type: Sequelize.INTEGER, // Código del usuario, numérico byte
        allowNull: false
      },
      fechaDeSalida: {
        type: Sequelize.DATE, // Fecha de salida, fecha/hora mediana
        allowNull: false
      },
      fechaMaximaParaDevolver: {
        type: Sequelize.DATE, // Fecha máxima para devolver, fecha/hora mediana
        allowNull: false
      },
      fechaDeDevolucion: {
        type: Sequelize.DATE, // Fecha de devolución, fecha/hora mediana
      }
    });
  
    return prestado;
  }
