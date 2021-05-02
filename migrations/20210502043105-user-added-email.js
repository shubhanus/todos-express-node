"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    return Promise.all([
      queryInterface.addColumn("Users", "email", {
        type: DataTypes.STRING,
        allowNull: false,
      }),
    ]);
  },
  down: async (queryInterface, DataTypes) => {
    return Promise.all([queryInterface.removeColumn("Users", "email")]);
  },
};
