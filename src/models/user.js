'use strict';
const {
  Model
} = require('sequelize');
const { Tasks } = require('./tasks')
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      // users to tasks
      this.hasMany(models.Tasks, {
        foreignKey: 'user_id',
        as: 'tasks'
      })
    }
  }
  Users.init({
    username: DataTypes.STRING,
    fullname: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};