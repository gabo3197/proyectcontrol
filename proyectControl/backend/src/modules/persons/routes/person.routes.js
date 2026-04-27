'use strict';

const { Router }   = require('express');
const controller   = require('../controllers/person.controller');
const validator    = require('../validators/person.validator');

const router = Router();

router.get('/',    controller.index);
router.get('/:id', validator.getById, controller.show);
router.post('/',   validator.create,  controller.store);

module.exports = router;
