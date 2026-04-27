'use strict';

/**
 * tasks/dtos/task.dto.js
 */

const CreateTaskDto = (body, projectId) => ({
  title:           body.title?.trim(),
  description:     body.description?.trim() || null,
  status:          body.status          || 'new',
  estimated_hours: body.estimated_hours  ? Number(body.estimated_hours) : null,
  project_id:      projectId,
  person_id:       body.person_id        || null,
});

const UpdateTaskDto = (body) => {
  const dto = {};
  if (body.title           !== undefined) dto.title           = body.title.trim();
  if (body.description     !== undefined) dto.description     = body.description?.trim() || null;
  if (body.status          !== undefined) dto.status          = body.status;
  if (body.estimated_hours !== undefined) dto.estimated_hours = body.estimated_hours ? Number(body.estimated_hours) : null;
  if (body.person_id       !== undefined) dto.person_id       = body.person_id || null;
  return dto;
};

const TaskResponseDto = (task) => ({
  id:              task.id,
  title:           task.title,
  description:     task.description,
  status:          task.status,
  estimated_hours: task.estimated_hours,
  project_id:      task.project_id,
  person_id:       task.person_id,
  assignee:        task.assignee || null,
  created_at:      task.created_at,
  updated_at:      task.updated_at,
});

module.exports = { CreateTaskDto, UpdateTaskDto, TaskResponseDto };
