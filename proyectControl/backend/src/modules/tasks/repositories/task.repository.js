'use strict';

const { Task }             = require('../models/task.model');
const { paginate, formatPage } = require('../../../shared/pagination');

/**
 * tasks/repositories/task.repository.js
 *
 * Único lugar que habla con Sequelize para el dominio tasks.
 * Los includes (Person) se reciben como parámetro desde el service.
 */

const findByProject = async (projectId, query, include) => {
  const { limit, offset, page, pageSize } = paginate(query);

  const where = { project_id: projectId };
  if (query.personId) where.person_id = query.personId;
  if (query.status)   where.status    = query.status;

  const result = await Task.findAndCountAll({
    where, include, limit, offset,
    order: [['created_at', 'DESC']],
  });

  return formatPage(result, page, pageSize);
};

const findById = (id, include) =>
  Task.findByPk(id, { include });

const save = (data) =>
  Task.create(data);

const update = async (instance, data) => {
  await instance.update(data);
  return instance;
};

const remove = async (instance) => {
  await instance.destroy();
  return true;
};

module.exports = { findByProject, findById, save, update, remove };
