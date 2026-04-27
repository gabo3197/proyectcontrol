'use strict';

const sequelize   = require('../../../shared/db');
const { DataTypes } = require('sequelize');

const Person = sequelize.define('Person', {
  id: {
    type:         DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey:   true,
  },
  name: {
    type:      DataTypes.STRING(150),
    allowNull: false,
    validate:  { notEmpty: true, len: [2, 150] },
  },
  email: {
    type:      DataTypes.STRING(255),
    allowNull: false,
    unique:    true,
    validate:  { isEmail: true },
  },
  avatar_url: {
    type:      DataTypes.STRING(500),
    allowNull: true,
  },
}, { tableName: 'persons', underscored: true });

module.exports = Person;
