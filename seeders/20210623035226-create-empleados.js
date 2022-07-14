'use strict';
const bcrypt=require('bcrypt');
const moment=require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    var empl =[{
      dni: 30111222,
      id_area: 2,
      nombre: "Matias",
      apellido: "Herrera",
      mail: "matias@correo.com",
      contraseña: await bcrypt.hash('12345678', 10),
      celular: null,
      estado: true,
      fecha_creacion: moment(new Date).format("YYYY-MM-DD"),
    },{
      dni: 32111222,
      id_area: 3,
      nombre: "Gaston",
      apellido: "Sosa",
      mail: "gaston@correo.com",
      contraseña: await bcrypt.hash('12345678', 10),
      celular: null,
      estado: true,
      fecha_creacion: moment(new Date).format("YYYY-MM-DD"),
    },
    {
        dni: 33111222,
        id_area: 4,
        nombre: "Federico",
        apellido: "Alcaraz",
        mail: "federico@correo.com",
        contraseña: await bcrypt.hash('12345678', 10),
        celular: null,
        estado: true,
        fecha_creacion: moment(new Date).format("YYYY-MM-DD"),
    },
    {
        dni: 34111222,
        id_area: 5,
        nombre: "Genaro",
        apellido: "Alcaraz",
        mail: "genaro@correo.com",
        contraseña: await bcrypt.hash('12345678', 10),
        celular: null,
        estado: true,
        fecha_creacion: moment(new Date).format("YYYY-MM-DD"),
      }
    ];
    await queryInterface.bulkInsert('empleados', empl, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('empleados',{ 
    dni: [30111222, 32111222, 33111222, 34111222]
    }, {});
  }
};