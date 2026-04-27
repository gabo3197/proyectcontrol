import React from 'react';
import ProjectCard from '../../molecules/ProjectCard/ProjectCard';
import Pagination from '../../molecules/Pagination/Pagination';
import Spinner from '../../atoms/Spinner/Spinner';
import styles from './ProjectList.module.css';

/**
 * ORGANISM — ProjectList
 * Renders the grid of project cards with pagination.
 */
const ProjectList = ({ projects, pagination, loading, selectedId, onSelect, onPageChange }) => {
  if (loading && !projects.length) {
    return (
      <div className={styles.center}>
        <Spinner size="lg" />
        <p className={styles.hint}>Loading projects…</p>
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className={styles.center}>
        <div className={styles.emptyIcon}>📂</div>
        <p className={styles.emptyTitle}>No projects yet</p>
        <p className={styles.hint}>Create your first project to get started.</p>
      </div>
    );
  }

  return (
    <section className={styles.section} aria-label="Projects list">
      <div className={styles.grid}>
        {projects.map((project, idx) => (
          <div key={project.id} style={{ animationDelay: `${idx * 50}ms` }}>
            <ProjectCard
              project={project}
              onClick={onSelect}
              isActive={selectedId === project.id}
            />
          </div>
        ))}
      </div>
      <Pagination pagination={pagination} onPageChange={onPageChange} />
    </section>
  );
};

export default ProjectList;
