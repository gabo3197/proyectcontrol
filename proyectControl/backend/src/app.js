'use strict';

require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const morgan  = require('morgan');

// ─── Módulos (solo se importa el barrel de cada uno) ──────────────────────
const { router: personsRouter }                          = require('./modules/persons');
const { router: projectsRouter }                         = require('./modules/projects');
const { nestedRouter: tasksNested,
        standaloneRouter: tasksStandalone,
        setupAssociations }                              = require('./modules/tasks');

// ─── Shared ───────────────────────────────────────────────────────────────
const errorHandler = require('./shared/errorHandler');

// ─── Associations ─────────────────────────────────────────────────────────
// Una sola llamada cuando todos los módulos ya están en memoria.
setupAssociations();

// ─── App ──────────────────────────────────────────────────────────────────
const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use(morgan('dev'));

// ─── Health ───────────────────────────────────────────────────────────────
app.get('/health', (_, res) =>
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
);

// ─── API v1 ───────────────────────────────────────────────────────────────
const api = express.Router();

api.use('/persons',                   personsRouter);
api.use('/projects',                  projectsRouter);
api.use('/projects/:projectId/tasks', tasksNested);      // GET + POST anidados
api.use('/tasks',                     tasksStandalone);  // GET|PUT|DELETE por id

app.use('/api/v1', api);

// ─── 404 ──────────────────────────────────────────────────────────────────
app.use((_, res) =>
  res.status(404).json({ success: false, error: 'Route not found' })
);

// ─── Error handler global ─────────────────────────────────────────────────
app.use(errorHandler);

module.exports = app;
