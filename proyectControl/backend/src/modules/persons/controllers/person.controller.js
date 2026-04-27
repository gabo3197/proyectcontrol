'use strict';

const { validationResult }               = require('express-validator');
const service                            = require('../services/person.service');
const { success, created, error, notFound } = require('../../../shared/response');

/**
 * persons/controllers/person.controller.js
 *
 * Solo maneja HTTP. Extrae datos del request, llama al service,
 * formatea la respuesta. Sin lógica de negocio.
 */

const index = async (req, res, next) => {
  try {
    const persons = await service.getAll();
    success(res, { data: persons });
  } catch (err) { next(err); }
};

const show = async (req, res, next) => {
  try {
    const person = await service.getById(req.params.id);
    if (!person) return notFound(res, 'Person');
    success(res, { data: person });
  } catch (err) { next(err); }
};

const store = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return error(res, 'Validation failed', 422, errors.array());
    const person = await service.create(req.body);
    created(res, { data: person });
  } catch (err) { next(err); }
};

module.exports = { index, show, store };
