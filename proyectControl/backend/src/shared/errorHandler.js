'use strict';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error('[ERROR]', err.message);

  if (err.name === 'SequelizeValidationError')
    return res.status(422).json({
      success: false, error: 'Validation error',
      details: err.errors.map((e) => ({ field: e.path, message: e.message })),
    });

  if (err.name === 'SequelizeUniqueConstraintError')
    return res.status(409).json({
      success: false, error: 'Resource already exists',
      details: err.errors.map((e) => ({ field: e.path, message: e.message })),
    });

  if (err.name === 'SequelizeForeignKeyConstraintError')
    return res.status(409).json({ success: false, error: 'Related resource not found' });

  return res.status(err.statusCode || 500).json({
    success: false, error: err.message || 'Internal server error',
  });
};

module.exports = errorHandler;
