'use strict';

const procedure_name = "cuantro_derivaciones"
const solicitud='solic';
const fecha='fecha';
const area='area';
const procedure_derivacion = `
CREATE PROCEDURE ${procedure_name} (IN ${solicitud} INT, IN ${fecha} DATETIME, IN ${area} INT)  BEGIN
	DECLARE cant INT;
	SELECT COUNT(h.id_solicitud) FROM historial h WHERE h.id_solicitud = solic INTO cant;
	IF(cant > 4) THEN
		INSERT INTO notificaciones(fecha_ingreso_historial, id_area_historial, id_solicitud_historial, fecha, descripcion, estado)
		VALUES (fecha, area, solic, CURRENT_TIMESTAMP,CONCAT("Solicitud pasada ", cant, " veces"), "Pendiente");
	END IF;
END
`

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(procedure_derivacion);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`DROP EVENT IF EXISTS ${procedure_name}`);
  }
};