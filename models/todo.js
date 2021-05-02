"use strict";
const { Model } = require("sequelize");
const enums = require("../enum");

const todoValues = enums.TODO_STATUS_ENUM.getValues();

console.log(todoValues);

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
          name: "userId",
          as: 'user'
        },
      });
    }
  }
  Todo.init(
    {
      uid: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(todoValues),
        allowNull: false,
        defaultValue: todoValues[0],
      },
    },
    {
      sequelize,
      tableName: "todos",
      modelName: "Todo",
      defaultScope: {
        attributes: {
          exclude: ["id", "userId", 'uid'],
        },
      },
    }
  );
  return Todo;
};
