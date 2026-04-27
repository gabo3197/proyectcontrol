'use strict';

/**
 * modules/persons/index.js  —  Barrel (única puerta de entrada)
 *
 * Lo que se exporta aquí es TODO lo que el resto del sistema
 * puede saber de este módulo. Lo interno es privado.
 *
 * ─── Para migrar a microservicio ──────────────────────────────
 * 1. Copia la carpeta persons/ completa a un nuevo repo
 * 2. Reemplaza este index.js por un app.js + server.js de Express
 * 3. Ajusta shared/db.js para apuntar a su propia BD
 * 4. El resto del código no cambia
 */

const router = require('./routes/person.routes');
const Person = require('./models/person.model');

module.exports = { router, Person };
