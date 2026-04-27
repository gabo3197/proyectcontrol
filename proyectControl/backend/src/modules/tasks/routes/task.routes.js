'use strict';

const { Router }  = require('express');
const controller  = require('../controllers/task.controller');
const validator   = require('../validators/task.validator');

// Montado en /projects/:projectId/tasks  (desde app.js con mergeParams)
const nestedRouter = Router({ mergeParams: true });
nestedRouter.get('/',  controller.index);
nestedRouter.post('/', validator.create, controller.store);

// Montado en /tasks  (acceso directo por ID)
const standaloneRouter = Router();
standaloneRouter.get('/:id',    validator.getById, controller.show);
standaloneRouter.put('/:id',    validator.update,  controller.update);
standaloneRouter.delete('/:id',                    controller.destroy);

module.exports = { nestedRouter, standaloneRouter };
