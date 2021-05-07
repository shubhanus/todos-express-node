'use strict';

import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
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
        },
      });
    }

    toJSON() {
      return { ...this.get(), userId: undefined };
    }
  }
  Profile.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      phone: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      tableName: 'profiles',
      modelName: 'Profile',
    },
  );
  return Profile;
};
