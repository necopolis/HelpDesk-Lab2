'use strict';
const bcrypt=require('bcrypt');
const moment=require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    var cli =[{
      dni: 31356168,
      nombre: "Belen",
      apellido: "Juarez",
      mail: "belen@correo.com",
      contraseña: await bcrypt.hash('12345678', 10),
      celular: null,
      estado: true,
      fecha_creacion: moment(new Date).format("YYYY-MM-DD"),
    },{
      dni: 42111222,
      nombre: "Bora",
      apellido: "Rivero",
      mail: "Nora@correo.com",
      contraseña: await bcrypt.hash('12345678', 10),
      celular: null,
      estado: true,
      fecha_creacion: moment(new Date).format("YYYY-MM-DD"),
    }];
    await queryInterface.bulkInsert('clientes', cli, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('clientes',{ 
    dni: [30111222, 32111222, 33111222, 34111222]
    }, {});
  }
};