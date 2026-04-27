"use strict";

const repository = require("../repositories/project.repository");
const { computeStatus } = require("../models/project.model");
const {
  CreateProjectDto,
  UpdateProjectDto,
  ProjectResponseDto,
} = require("../dtos/project.dto");

/**
 * projects/services/project.service.js
 *
 * Lógica de negocio. Construye los includes cross-módulo aquí
 * para mantener el repository agnóstico a otros modelos.
 *
 * Las dependencias cross-módulo (Task, Person) se importan lazy
 * para evitar dependencias circulares en el arranque.
 */

const { buildTaskInclude } = require("../../tasks");

const getInclude = () => [buildTaskInclude()];

const serialize = (project) => {
  const plain = project.get({ plain: true });
  plain.status = computeStatus(plain.tasks || []);
  return ProjectResponseDto(plain);
};

const getAll = async (query) => {
  const include = getInclude();
  const result = await repository.findAll(query, include);
  return {
    data: result.data.map((p) => {
      // result.data ya son plain objects del formatPage
      p.status = computeStatus(p.tasks || []);
      return ProjectResponseDto(p);
    }),
    pagination: result.pagination,
  };
};

const getById = async (id) => {
  const project = await repository.findById(id, getInclude());
  return project ? serialize(project) : null;
};

const create = async (body) => {
  const dto = CreateProjectDto(body);
  const project = await repository.save(dto);
  // Proyecto nuevo no tiene tareas → status = 'new'
  return ProjectResponseDto({ ...project.get({ plain: true }), tasks: [] });
};

const update = async (id, body) => {
  const project = await repository.findById(id, getInclude());
  if (!project) return null;
  const dto = UpdateProjectDto(body);
  await repository.update(project, dto);
  await project.reload({ include: getInclude() });
  return serialize(project);
};

const remove = async (id) => {
  const project = await repository.findById(id, []);
  if (!project) return false;
  return repository.remove(project);
};

module.exports = { getAll, getById, create, update, remove };
