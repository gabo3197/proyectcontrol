"use strict";

const sequelize = require("../../../shared/db");
const { DataTypes } = require("sequelize");

/**
 * projects/models/project.model.js
 *
 * status es un campo VIRTUAL: se calcula desde las tareas en runtime.
 * No se persiste en BD. Si se extrae a microservicio, pasa a ser
 * una columna ENUM persistida y se actualiza via eventos.
 */

const computeStatus = (tasks = []) => {
  if (!tasks.length) return "new";
  const statuses = tasks.map((t) => t.status);
  if (statuses.every((s) => s === "final")) return "final";
  if (statuses.some((s) => s === "in progress")) return "in progress";
  return "new";
};

const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: { notEmpty: true, len: [2, 200] },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.VIRTUAL,
      get() {
        return computeStatus(this.tasks || []);
      },
    },
  },
  { tableName: "projects", underscored: true }
);

module.exports = { Project, computeStatus };
