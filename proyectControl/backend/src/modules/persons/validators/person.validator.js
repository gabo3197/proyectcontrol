'use strict';

const { body, param } = require('express-validator');

const create = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2, max: 150 }),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('avatar_url').optional({ nullable: true }).isURL().withMessage('Must be a valid URL'),
];

const getById = [
  param('id').isUUID().withMessage('Invalid person ID'),
];

module.exports = { create, getById };
