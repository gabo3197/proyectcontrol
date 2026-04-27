'use strict';

const Person = require('../models/person.model');

/**
 * persons/repositories/person.repository.js
 *
 * Capa de acceso a datos. Es el ÚNICO lugar del módulo que
 * habla directamente con Sequelize / la BD.
 *
 * El service NO importa el modelo — siempre pasa por el repository.
 *
 * Beneficio: si mañana cambias de Sequelize a Prisma o a una API HTTP
 * (cuando extraigas a microservicio), solo reescribes este archivo.
 * El service, controller y rutas no se tocan.
 */

const findAll = () =>
  Person.findAll({ order: [['name', 'ASC']] });

const findById = (id) =>
  Person.findByPk(id);

const findByEmail = (email) =>
  Person.findOne({ where: { email } });

const save = (data) =>
  Person.create(data);

module.exports = { findAll, findById, findByEmail, save };
