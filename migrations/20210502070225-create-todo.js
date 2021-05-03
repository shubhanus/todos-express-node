"use strict";
import { TODO_STATUS_ENUM_VALUES } from "../enum";

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("Todos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(TODO_STATUS_ENUM_VALUES),
        allowNull: false,
        defaultValue: TODO_STATUS_ENUM_VALUES[0],
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("Todos");
  },
};
