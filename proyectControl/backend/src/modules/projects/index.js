'use strict';

/**
 * modules/projects/index.js  —  Barrel file
 *
 * Exporta el router y el modelo Project.
 * Project model se expone para que tasks pueda declarar
 * la FK association sin acoplarse al módulo completo.
 */

const router              = require('./routes/project.routes');
const { Project,
        computeStatus }   = require('./models/project.model');

module.exports = { router, Project, computeStatus };
