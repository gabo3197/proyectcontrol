"use strict";

const { validationResult } = require("express-validator");
const service = require("../services/project.service");
const {
  success,
  created,
  error,
  notFound,
} = require("../../../shared/response");

const index = async (req, res, next) => {
  try {
    console.log("Query params:", req.query);
    const result = await service.getAll(req.query);
    success(res, result);
  } catch (err) {
    next(err);
  }
};

const show = async (req, res, next) => {
  try {
    const project = await service.getById(req.params.id);
    if (!project) return notFound(res, "Project");
    success(res, { data: project });
  } catch (err) {
    next(err);
  }
};

const store = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return error(res, "Validation failed", 422, errors.array());
    const project = await service.create(req.body);
    created(res, { data: project });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return error(res, "Validation failed", 422, errors.array());
    const project = await service.update(req.params.id, req.body);
    if (!project) return notFound(res, "Project");
    success(res, { data: project });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const deleted = await service.remove(req.params.id);
    if (!deleted) return notFound(res, "Project");
    success(res, { message: "Project deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = { index, show, store, update, destroy };
