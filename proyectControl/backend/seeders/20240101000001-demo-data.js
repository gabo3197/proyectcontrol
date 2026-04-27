"use strict";

const { v4: uuidv4 } = require("uuid");

const personIds = [uuidv4(), uuidv4(), uuidv4(), uuidv4()];
const projectIds = [uuidv4(), uuidv4(), uuidv4()];

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("persons", [
      {
        id: personIds[0],
        name: "Robinson palacios",
        email: "robinson@corre.com",
        avatar_url: null,
        created_at: now,
        updated_at: now,
      },
      {
        id: personIds[1],
        name: "Carlos ",
        email: "carlos@correo.com",
        avatar_url: null,
        created_at: now,
        updated_at: now,
      },
      {
        id: personIds[2],
        name: "laura",
        email: "laura@correo.com",
        avatar_url: null,
        created_at: now,
        updated_at: now,
      },
      {
        id: personIds[3],
        name: "Luis",
        email: "luis@correo.com",
        avatar_url: null,
        created_at: now,
        updated_at: now,
      },
    ]);

    await queryInterface.bulkInsert("projects", [
      {
        id: projectIds[0],
        name: "Senior poryect",
        description: "Se implementara el acenso a senior .",
        created_at: now,
        updated_at: now,
      },
    ]);

    await queryInterface.bulkInsert("tasks", [
      // Project 1 tasks
      {
        id: uuidv4(),
        title: "Estudiar patrones ",
        description: "Buscar y estudiar los patrones de diseño.",
        status: "in progress",
        estimated_hours: 40,
        project_id: projectIds[0],
        person_id: personIds[2],
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        title: "Implementación de componentes React",
        description:
          "Desarrollar la biblioteca de componentes reutilizables basada en el sistema de diseño aprobado.",
        status: "new",
        estimated_hours: 80,
        project_id: projectIds[0],
        person_id: personIds[1],
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("tasks", null, {});
    await queryInterface.bulkDelete("projects", null, {});
    await queryInterface.bulkDelete("persons", null, {});
  },
};
