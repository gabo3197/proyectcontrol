import React, { useState, useEffect } from "react";
import Badge from "../../atoms/Badge/Badge";
import Avatar from "../../atoms/Avatar/Avatar";
import Select from "../../atoms/Select/Select";
import Button from "../../atoms/Button/Button";
import {
  formatHours,
  TASK_STATUSES,
  getStatusLabel,
} from "../../../utils/status";
import { useTasks } from "../../../hooks/useTasks";
import { useAppStore } from "../../../store";
import styles from "./TaskDetail.module.css";

/**
 * ORGANISM — TaskDetail
 * Shows full task information and allows status + assignee update.
 */
const TaskDetail = ({ task, projectId, onUpdated }) => {
  const { updateTask, loading } = useTasks(projectId);
  const { persons } = useAppStore();

  const [editStatus, setEditStatus] = useState(task.status);
  const [editPerson, setEditPerson] = useState(task.person_id || "");
  const [saved, setSaved] = useState(false);

  // Sync local state when a different task is selected
  useEffect(() => {
    setEditStatus(task.status);
    setEditPerson(task.person_id || "");
    setSaved(false);
  }, [task.id, task.status, task.person_id]);

  if (!task) return null;

  const statusOptions = TASK_STATUSES.map((s) => ({
    value: s,
    label: getStatusLabel(s),
  }));
  const personOptions = persons.map((p) => ({ value: p.id, label: p.name }));

  const hasChange =
    editStatus !== task.status || editPerson !== (task.person_id || "");

  const handleSave = async () => {
    await updateTask(task.id, {
      status: editStatus,
      person_id: editPerson || null,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    onUpdated?.();
  };

  // Current assignee preview (reflects live selection before saving)
  const previewPerson = persons.find((p) => p.id === editPerson) || null;

  return (
    <aside className={styles.panel} aria-label="Task detail">
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.topRow}>
          <Badge status={task.status} size="md" />
          <span className={styles.taskId} title="Task ID">
            #{task.id.slice(0, 8)}
          </span>
        </div>
        <h2 className={styles.title}>{task.title}</h2>
      </div>

      {/* Description */}
      {task.description && (
        <section className={styles.section}>
          <h3 className={styles.sectionLabel}>Description</h3>
          <p className={styles.description}>{task.description}</p>
        </section>
      )}

      {/* Meta grid */}
      <section className={styles.section}>
        <h3 className={styles.sectionLabel}>Details</h3>
        <div className={styles.metaGrid}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Estimated time</span>
            <span className={styles.metaValue}>
              {formatHours(task.estimated_hours) || "—"}
            </span>
          </div>
        </div>
      </section>

      {/* Assignee — preview + selector */}
      <section className={styles.section}>
        <h3 className={styles.sectionLabel}>Assignee</h3>
        {previewPerson ? (
          <div className={styles.assignee}>
            <Avatar name={previewPerson.name} size="lg" />
            <div>
              <p className={styles.assigneeName}>{previewPerson.name}</p>
              <p className={styles.assigneeEmail}>{previewPerson.email}</p>
            </div>
          </div>
        ) : (
          <p className={styles.unassigned}>Unassigned</p>
        )}
        <Select
          options={personOptions}
          placeholder="Unassigned"
          value={editPerson}
          onChange={(e) => setEditPerson(e.target.value)}
          aria-label="Change assignee"
          className={styles.assigneeSelect}
        />
      </section>

      {/* Status update */}
      <section
        className={styles.section}
        style={{ paddingBottom: "var(--sp-6)" }}
      >
        <h3 className={styles.sectionLabel}>Status</h3>
        <Select
          options={statusOptions}
          value={editStatus}
          onChange={(e) => setEditStatus(e.target.value)}
          aria-label="Change task status"
        />
      </section>

      {/* Save bar — aparece solo cuando hay cambios */}
      {(hasChange || saved) && (
        <div className={styles.saveBar}>
          {hasChange ? (
            <>
              <span className={styles.pendingMsg}>Unsaved changes</span>
              <Button
                variant="primary"
                size="sm"
                loading={loading}
                onClick={handleSave}
              >
                Save changes
              </Button>
            </>
          ) : (
            <span className={styles.savedMsg}>✓ Saved successfully</span>
          )}
        </div>
      )}
    </aside>
  );
};

export default TaskDetail;
