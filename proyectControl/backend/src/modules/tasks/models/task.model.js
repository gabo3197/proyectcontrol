'use strict';

const sequelize     = require('../../../shared/db');
const { DataTypes } = require('sequelize');

/**
 * tasks/models/task.model.js
 *
 * setupAssociations() se llama desde app.js una vez que todos los
 * módulos están cargados, evitando dependencias circulares.
 *
 * Regla: el módulo que posee las FK declara las associations.
 * Task tiene project_id y person_id → Task declara ambas.
 */

const Task = sequelize.define('Task', {
  id: {
    type:         DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey:   true,
  },
  title: {
    type:      DataTypes.STRING(200),
    allowNull: false,
    validate:  { notEmpty: true, len: [2, 200] },
  },
  description: {
    type:      DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type:         DataTypes.ENUM('new', 'in progress', 'final'),
    allowNull:    false,
    defaultValue: 'new',
  },
  estimated_hours: {
    type:      DataTypes.DECIMAL(6, 2),
    allowNull: true,
    validate:  { min: 0 },
  },
  project_id: {
    type:      DataTypes.UUID,
    allowNull: false,
  },
  person_id: {
    type:      DataTypes.UUID,
    allowNull: true,
  },
}, { tableName: 'tasks', underscored: true });

const setupAssociations = () => {
  const Person  = require('../../persons/models/person.model');
  const { Project } = require('../../projects/models/project.model');

  Task.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });
  Task.belongsTo(Person,  { foreignKey: 'person_id',  as: 'assignee' });

  Project.hasMany(Task, { foreignKey: 'project_id', as: 'tasks', onDelete: 'CASCADE' });
  Person.hasMany(Task,  { foreignKey: 'person_id',  as: 'tasks' });
};

module.exports = { Task, setupAssociations };
