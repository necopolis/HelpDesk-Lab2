'use strict';

const procedure_name = "treinta_horas"
const procedure_horas = `
CREATE PROCEDURE ${procedure_name} ()  BEGIN
	DECLARE v_fecha DATETIME;
	DECLARE v_area INTEGER;
	DECLARE v_solic INTEGER;
    DECLARE fechas CURSOR FOR SELECT h.fecha_ingreso, h.id_area,
		s.id_solicitud
        FROM historial h JOIN solicitudes s
        ON h.id_solicitud = s.id_solicitud
        WHERE TIMESTAMPDIFF(HOUR, h.fecha_ingreso, CURRENT_TIMESTAMP) > 36
        AND h.fecha_egreso IS NULL
		AND s.prioridad LIKE "%Alta%";
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET @hecho = TRUE;
	BEGIN
     OPEN fechas;
    	L1:LOOP
            FETCH fechas INTO v_fecha, v_area, v_solic;
			IF(@hecho) THEN
                LEAVE L1;
            END IF;
            INSERT INTO notificaciones(fecha_ingreso_historial, id_area_historial, id_solicitud_historial, fecha, descripcion, estado, createdAt, updatedAt) 					
			VALUES (v_fecha, v_area, v_solic, CURRENT_TIMESTAMP,"Han pasado 36 Horas", "Pendiente", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    	END LOOP L1;
     CLOSE fechas;
	END;
END
`

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(procedure_horas );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`DROP EVENT IF EXISTS ${procedure_name}`);
  }
};