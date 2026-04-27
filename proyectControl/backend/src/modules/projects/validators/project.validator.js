'use strict';

const { body, param } = require('express-validator');

const create = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2, max: 200 }),
  body('description').optional({ nullable: true }).isString(),
];

const update = [
  param('id').isUUID().withMessage('Invalid project ID'),
  body('name').optional().trim().notEmpty().isLength({ min: 2, max: 200 }),
  body('description').optional({ nullable: true }).isString(),
];

const getById = [
  param('id').isUUID().withMessage('Invalid project ID'),
];

module.exports = { create, update, getById };
