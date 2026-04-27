"use strict";

const { Project } = require("../models/project.model");
const { paginate, formatPage } = require("../../../shared/pagination");

/**
 * projects/repositories/project.repository.js
 *
 * Único lugar que habla con Sequelize para el dominio projects.
 * Recibe los includes (Task, Person) como parámetro para no
 * acoplar el repository al modelo de otros módulos directamente —
 * el service construye el include y lo pasa.
 */

const findAll = async (query, include) => {
  const { limit, offset, page, pageSize } = paginate(query);

  const result = await Project.findAndCountAll({
    include,
    limit,
    offset,
    distinct: true,
    order: [["created_at", "DESC"]],
  });

  return formatPage(result, page, pageSize);
};

const findById = (id, include) => Project.findByPk(id, { include });

const save = (data) => Project.create(data);

const update = async (instance, data) => {
  await instance.update(data);
  return instance;
};

const remove = async (instance) => {
  await instance.destroy();
  return true;
};

module.exports = { findAll, findById, save, update, remove };
