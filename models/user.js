"use strict";
import { Model } from "sequelize";
import { USER_ROLES_ENUM, USER_ROLES_ENUM_VALUES } from "../enum";

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Todo }) {
      // define association here
      this.hasMany(Todo, {
        foreignKey: {
          allowNull: false,
          name: "userId",
        },
      });
    }

    isAdmin() {
      return this.role === USER_ROLES_ENUM.admin;
    }
  }
  User.init(
    {
      uid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User Name is required" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password is required" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Email is required" },
          isEmail: { msg: "Email should be proper format abc@abc.com" },
        },
      },
      role: {
        type: DataTypes.ENUM(USER_ROLES_ENUM_VALUES),
        allowNull: false,
        defaultValue: USER_ROLES_ENUM.user,
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
      defaultScope: {
        attributes: { exclude: ["password", "id"] },
      },
      scopes: {
        withSecretColumns: {
          attributes: {
            include: ["id", "password"],
          },
        },
      },
    }
  );
  return User;
};
