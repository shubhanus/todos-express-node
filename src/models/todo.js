'use strict';

import { Model } from 'sequelize';

const { TODO_STATUS_ENUM, TODO_STATUS_ENUM_VALUES } = require('../enum');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, {
        foreignKey: {
          allowNull: false,
          name: 'userId',
          as: 'user',
        },
      });
    }
  }
  Todo.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(TODO_STATUS_ENUM_VALUES),
        allowNull: false,
        defaultValue: TODO_STATUS_ENUM.todo,
      },
    },
    {
      sequelize,
      tableName: 'todos',
      modelName: 'Todo',
      defaultScope: {
        attributes: {
          exclude: ['userId', 'uid'],
        },
      },
    },
  );
  return Todo;
};
