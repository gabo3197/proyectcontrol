'use strict';

const repository = require('../repositories/task.repository');
const { CreateTaskDto, UpdateTaskDto, TaskResponseDto } = require('../dtos/task.dto');

/**
 * tasks/services/task.service.js
 *
 * Lógica de negocio del módulo tasks.
 * Importa Person lazy para evitar dependencias circulares.
 */

const getAssigneeInclude = () => {
  const Person = require('../../persons/models/person.model');
  return [{ model: Person, as: 'assignee', attributes: ['id', 'name', 'email'] }];
};

const getByProject = async (projectId, query) => {
  const include = getAssigneeInclude();
  const result  = await repository.findByProject(projectId, query, include);
  return {
    data:       result.data.map(TaskResponseDto),
    pagination: result.pagination,
  };
};

const getById = async (id) => {
  const task = await repository.findById(id, getAssigneeInclude());
  return task ? TaskResponseDto(task) : null;
};

const create = async (projectId, body) => {
  const { Project } = require('../../projects/models/project.model');
  const project     = await Project.findByPk(projectId);
  if (!project) return null;

  const dto  = CreateTaskDto(body, projectId);
  const task = await repository.save(dto);
  await task.reload({ include: getAssigneeInclude() });
  return TaskResponseDto(task);
};

const update = async (id, body) => {
  const task = await repository.findById(id, []);
  if (!task) return null;

  const dto = UpdateTaskDto(body);
  await repository.update(task, dto);
  await task.reload({ include: getAssigneeInclude() });
  return TaskResponseDto(task);
};

const remove = async (id) => {
  const task = await repository.findById(id, []);
  if (!task) return false;
  return repository.remove(task);
};

module.exports = { getByProject, getById, create, update, remove };
