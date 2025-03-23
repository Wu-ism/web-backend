const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Device = sequelize.define('Device', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  serial: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  status: {
    type: DataTypes.ENUM('online', 'offline', 'error'),
    defaultValue: 'offline'
  },
  lastCheckIn: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

module.exports = Device;