'use strict';

const success  = (res, data, status = 200) => res.status(status).json({ success: true,  ...data });
const created  = (res, data)               => success(res, data, 201);
const error    = (res, msg, status = 400, details = null) =>
  res.status(status).json({ success: false, error: msg, ...(details && { details }) });
const notFound = (res, entity = 'Resource') => error(res, `${entity} not found`, 404);

module.exports = { success, created, error, notFound };
