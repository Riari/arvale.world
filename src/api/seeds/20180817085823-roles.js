'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roles', [
      { name: 'Administrator', colour: '#ebbf0f' },
      { name: 'Developer', colour: '#da1f60' },
      { name: 'Community Emissary', colour: '#2ecc71' },
      { name: 'Dungeon Master', colour: '#3393d3' }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
