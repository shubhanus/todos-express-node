"use strict";

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn("Todos", "uid", {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    });
    await queryInterface.addColumn("Users", "uid", {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    });
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn("Todos", "uid");
    await queryInterface.removeColumn("Users", "uid");
  },
};
