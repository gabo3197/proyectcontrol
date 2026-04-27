"use strict";

/**
 * modules/tasks/index.js  —  Barrel file
 */

const { nestedRouter, standaloneRouter } = require("./routes/task.routes");
const { Task, setupAssociations } = require("./models/task.model");
const buildTaskInclude = () => {
  const Person = require("../persons/models/person.model");
  return {
    model: Task,
    as: "tasks",
    include: [
      { model: Person, as: "assignee", attributes: ["id", "name", "email"] },
    ],
  };
};

module.exports = {
  nestedRouter,
  standaloneRouter,
  Task,
  setupAssociations,
  buildTaskInclude,
};
