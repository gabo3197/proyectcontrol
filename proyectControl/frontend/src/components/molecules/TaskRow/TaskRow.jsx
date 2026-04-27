import React from 'react';
import Badge from '../../atoms/Badge/Badge';
import Avatar from '../../atoms/Avatar/Avatar';
import { formatHours } from '../../../utils/status';
import styles from './TaskRow.module.css';

/**
 * MOLECULE — TaskRow
 * A single task item in the task list.
 */
const TaskRow = ({ task, onClick, isActive = false }) => (
  <article
    className={`${styles.row} ${isActive ? styles.active : ''}`}
    onClick={() => onClick?.(task)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === 'Enter' && onClick?.(task)}
    aria-selected={isActive}
  >
    <div className={styles.left}>
      <div className={`${styles.statusLine} ${styles[task.status?.replace(' ', '_')]}`} />
      <div className={styles.info}>
        <span className={styles.title}>{task.title}</span>
        {task.description && (
          <span className={styles.desc}>{task.description}</span>
        )}
      </div>
    </div>

    <div className={styles.right}>
      <Badge status={task.status} size="sm" />
      {task.assignee && (
        <div className={styles.assignee}>
          <Avatar name={task.assignee.name} size="sm" />
          <span className={styles.assigneeName}>{task.assignee.name.split(' ')[0]}</span>
        </div>
      )}
      {task.estimated_hours && (
        <span className={styles.hours}>{formatHours(task.estimated_hours)}</span>
      )}
    </div>
  </article>
);

export default TaskRow;
