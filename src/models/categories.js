'use strict';
const {
  Model
} = require('sequelize');
const Tasks = require('./tasks')
const Users = require('./user')
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate(models) {
      // categories to tasks
      this.hasMany(models.Tasks, {
        foreignKey: 'categori_id',
        as: 'tasks'
      }),

      // categories to users
      this.belongsTo(models.Users, {
        foreignKey: 'user_id',
        as: 'user'
      })
    }
  }
  Categories.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: 'id'
      }
    },
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categories',
  });
  return Categories;
};