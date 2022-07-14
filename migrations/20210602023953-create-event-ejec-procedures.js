'use strict';

const event_name = "evento_control"
const event_control = ` 
CREATE EVENT ${event_name} 
  ON SCHEDULE 
    EVERY 1 HOUR STARTS '2022-07-14 07:14:56' 
  ON COMPLETION PRESERVE 
  ENABLE 
  
  DO BEGIN
  CALL quince_dias;
  CALL treinta_horas;
END
`

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(event_control);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`DROP EVENT IF EXISTS ${event_name}`);
  }
};