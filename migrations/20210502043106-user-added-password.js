'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    return Promise.all([
      queryInterface.addColumn('Users', 'password', {
        type: DataTypes.STRING,
      }),
    ]);
  },
  down: async (queryInterface) => {
    return Promise.all([queryInterface.removeColumn('Users', 'password')]);
  },
};
