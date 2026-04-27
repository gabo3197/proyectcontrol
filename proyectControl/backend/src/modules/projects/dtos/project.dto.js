'use strict';

/**
 * projects/dtos/project.dto.js
 *
 * CreateProjectDto  — filtra y normaliza el body entrante
 * UpdateProjectDto  — solo los campos modificables
 * ProjectResponseDto — forma pública del proyecto (incluye status y tareas)
 */

const CreateProjectDto = (body) => ({
  name:        body.name?.trim(),
  description: body.description?.trim() || null,
});

const UpdateProjectDto = (body) => {
  const dto = {};
  if (body.name        !== undefined) dto.name        = body.name.trim();
  if (body.description !== undefined) dto.description = body.description?.trim() || null;
  return dto;
};

const ProjectResponseDto = (plain) => ({
  id:          plain.id,
  name:        plain.name,
  description: plain.description,
  status:      plain.status,
  tasks:       plain.tasks || [],
  created_at:  plain.created_at,
  updated_at:  plain.updated_at,
});

module.exports = { CreateProjectDto, UpdateProjectDto, ProjectResponseDto };
