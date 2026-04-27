'use strict';

const { body, param } = require('express-validator');

const VALID_STATUSES = ['new', 'in progress', 'final'];

const create = [
  param('projectId').isUUID().withMessage('Invalid project ID'),
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ min: 2, max: 200 }),
  body('description').optional({ nullable: true }).isString(),
  body('status').optional().isIn(VALID_STATUSES).withMessage('Invalid status'),
  body('estimated_hours').optional({ nullable: true }).isFloat({ min: 0 }),
  body('person_id').optional({ nullable: true }).isUUID().withMessage('Invalid person ID'),
];

const update = [
  param('id').isUUID().withMessage('Invalid task ID'),
  body('title').optional().trim().notEmpty().isLength({ min: 2, max: 200 }),
  body('description').optional({ nullable: true }).isString(),
  body('status').optional().isIn(VALID_STATUSES),
  body('estimated_hours').optional({ nullable: true }).isFloat({ min: 0 }),
  body('person_id').optional({ nullable: true }).isUUID(),
];

const getById = [
  param('id').isUUID().withMessage('Invalid task ID'),
];

module.exports = { create, update, getById };
