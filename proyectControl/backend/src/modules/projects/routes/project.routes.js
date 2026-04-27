'use strict';

const { Router }  = require('express');
const controller  = require('../controllers/project.controller');
const validator   = require('../validators/project.validator');

const router = Router();

router.get('/',    controller.index);
router.post('/',   validator.create,  controller.store);
router.get('/:id', validator.getById, controller.show);
router.put('/:id', validator.update,  controller.update);
router.delete('/:id',                 controller.destroy);

// Rutas anidadas /projects/:projectId/tasks
// Se montan en app.js para evitar importar tasks desde projects
// y mantener el acoplamiento unidireccional entre módulos.

module.exports = router;
