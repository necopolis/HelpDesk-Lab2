'use strict';

const trigger_name = "trigger_historial"
const tabla="solicitudes";
const trigger_historial = `
CREATE TRIGGER ${trigger_name} AFTER INSERT ON ${tabla} FOR EACH ROW BEGIN
	INSERT INTO historial(fecha_ingreso, id_area, id_solicitud, estado)
	VALUES (CURRENT_TIMESTAMP, 2, NEW.id_solicitud, "Pendiente");
END
`

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(trigger_historial );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`DROP EVENT IF EXISTS ${trigger_name}`);
  }
};
