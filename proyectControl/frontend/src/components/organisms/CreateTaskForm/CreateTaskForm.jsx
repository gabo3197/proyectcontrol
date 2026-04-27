import React, { useState } from 'react';
import Input from '../../atoms/Input/Input';
import Select from '../../atoms/Select/Select';
import Button from '../../atoms/Button/Button';
import { useAppStore } from '../../../store';
import { TASK_STATUSES, getStatusLabel } from '../../../utils/status';
import { useTasks } from '../../../hooks/useTasks';
import styles from './CreateTaskForm.module.css';

/**
 * ORGANISM — CreateTaskForm
 * Form to create a new task inside a project.
 */
const CreateTaskForm = ({ projectId, onCreated, onCancel }) => {
  const { persons } = useAppStore();
  const { createTask, loading } = useTasks(projectId);

  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'new',
    estimated_hours: '',
    person_id: '',
  });
  const [errors, setErrors] = useState({});

  const personOptions = persons.map((p) => ({ value: p.id, label: p.name }));
  const statusOptions = TASK_STATUSES.map((s) => ({ value: s, label: getStatusLabel(s) }));

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: null }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (form.estimated_hours && isNaN(Number(form.estimated_hours)))
      e.estimated_hours = 'Must be a number';
    if (form.estimated_hours && Number(form.estimated_hours) < 0)
      e.estimated_hours = 'Must be positive';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const payload = {
        ...form,
        estimated_hours: form.estimated_hours ? Number(form.estimated_hours) : null,
        person_id: form.person_id || null,
      };
      const task = await createTask(payload);
      onCreated?.(task);
    } catch {
      /* error handled by hook */
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <Input
        id="task-title"
        label="Title *"
        placeholder="What needs to be done?"
        value={form.title}
        onChange={(e) => set('title', e.target.value)}
        error={errors.title}
      />

      <Input
        id="task-desc"
        label="Description"
        placeholder="Provide more context…"
        multiline
        rows={3}
        value={form.description}
        onChange={(e) => set('description', e.target.value)}
      />

      <div className={styles.row}>
        <Select
          id="task-status"
          label="Status"
          options={statusOptions}
          value={form.status}
          onChange={(e) => set('status', e.target.value)}
        />
        <Input
          id="task-hours"
          label="Estimated hours"
          type="number"
          min="0"
          step="0.5"
          placeholder="e.g. 8"
          value={form.estimated_hours}
          onChange={(e) => set('estimated_hours', e.target.value)}
          error={errors.estimated_hours}
        />
      </div>

      <Select
        id="task-person"
        label="Assignee"
        placeholder="Unassigned"
        options={personOptions}
        value={form.person_id}
        onChange={(e) => set('person_id', e.target.value)}
      />

      <div className={styles.actions}>
        <Button variant="secondary" size="md" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button variant="primary" size="md" type="submit" loading={loading}>
          Create task
        </Button>
      </div>
    </form>
  );
};

export default CreateTaskForm;
