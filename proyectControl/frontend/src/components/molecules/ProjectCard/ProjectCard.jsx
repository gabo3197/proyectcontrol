import React from 'react';
import Badge from '../../atoms/Badge/Badge';
import styles from './ProjectCard.module.css';

/**
 * MOLECULE — ProjectCard
 * Displays a project summary: name, description, status, task count.
 */
const ProjectCard = ({ project, onClick, isActive = false }) => {
  const taskCount = project.tasks?.length ?? 0;
  const completedCount = project.tasks?.filter((t) => t.status === 'final').length ?? 0;
  const progress = taskCount > 0 ? Math.round((completedCount / taskCount) * 100) : 0;

  return (
    <article
      className={`${styles.card} ${isActive ? styles.active : ''}`}
      onClick={() => onClick?.(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.(project)}
      aria-selected={isActive}
    >
      <div className={styles.header}>
        <div className={styles.icon} aria-hidden="true">
          {project.name.slice(0, 2).toUpperCase()}
        </div>
        <Badge status={project.status} size="sm" />
      </div>

      <h3 className={styles.name}>{project.name}</h3>
      {project.description && (
        <p className={styles.description}>{project.description}</p>
      )}

      <div className={styles.footer}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.meta}>
          <span className={styles.taskCount}>
            {completedCount}/{taskCount} tasks
          </span>
          <span className={styles.percent}>{progress}%</span>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
