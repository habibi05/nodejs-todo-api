'use strict';
const {
  Model
} = require('sequelize');
const Users = require('./user')
const Categories = require('./categories')
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    static associate(models) {
      // tasks to users
      this.belongsTo(models.Users, {
        foreignKey: 'user_id',
        as: 'user'
      }),

      // tasks to categories
      this.belongsTo(models.Categories, {
        foreignKey: 'categori_id',
        as: 'categori'
      })
    }
  }
  Tasks.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: 'id'
      }
    },
    categori_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Categories,
        key: 'id'
      }
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: ['pending', 'done'],
    }
  }, {
    sequelize,
    modelName: 'Tasks',
  });
  return Tasks;
};