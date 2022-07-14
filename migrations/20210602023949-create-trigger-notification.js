'use strict';

const trigger_name = "trigger_notificacion"
const tabla="historial";
const trigger_notification = `
CREATE TRIGGER ${trigger_name} AFTER INSERT ON ${tabla} FOR EACH ROW BEGIN
	CALL cuantro_derivaciones( 
        NEW.id_solicitud, NEW.fecha_ingreso, 
        NEW.id_area);
END
`

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(trigger_notification );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`DROP EVENT IF EXISTS ${trigger_name}`);
  }
};