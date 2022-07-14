'use strict';
const bcrypt=require('bcrypt');
const moment=require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    var admin =[{
      dni: 1,
      id_area: 1,
      nombre: "Administrador",
      apellido: "Administrador",
      mail: "admin@correo.com",
      contraseña: await bcrypt.hash('12345678', 10),
      celular: null,
      estado: true,
      fecha_creacion: moment(new Date).format("YYYY-MM-DD"),
    }];
    await queryInterface.bulkInsert('empleados', admin, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('empleados', null, {});
  }
};
