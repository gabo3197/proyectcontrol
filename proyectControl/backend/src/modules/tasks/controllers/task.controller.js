'use strict';

const { validationResult } = require('express-validator');
const service = require('../services/task.service');
const { success, created, error, notFound } = require('../../../shared/response');

const index = async (req, res, next) => {
  try {
    const result = await service.getByProject(req.params.projectId, req.query);
    success(res, result);
  } catch (err) { next(err); }
};

const show = async (req, res, next) => {
  try {
    const task = await service.getById(req.params.id);
    if (!task) return notFound(res, 'Task');
    success(res, { data: task });
  } catch (err) { next(err); }
};

const store = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return error(res, 'Validation failed', 422, errors.array());
    const task = await service.create(req.params.projectId, req.body);
    if (!task) return notFound(res, 'Project');
    created(res, { data: task });
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return error(res, 'Validation failed', 422, errors.array());
    const task = await service.update(req.params.id, req.body);
    if (!task) return notFound(res, 'Task');
    success(res, { data: task });
  } catch (err) { next(err); }
};

const destroy = async (req, res, next) => {
  try {
    const deleted = await service.remove(req.params.id);
    if (!deleted) return notFound(res, 'Task');
    success(res, { message: 'Task deleted successfully' });
  } catch (err) { next(err); }
};

module.exports = { index, show, store, update, destroy };
