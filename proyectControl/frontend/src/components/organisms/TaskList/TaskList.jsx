import React from 'react';
import TaskRow from '../../molecules/TaskRow/TaskRow';
import Pagination from '../../molecules/Pagination/Pagination';
import FilterBar from '../../molecules/FilterBar/FilterBar';
import Spinner from '../../atoms/Spinner/Spinner';
import styles from './TaskList.module.css';

/**
 * ORGANISM — TaskList
 * Renders task rows with filter bar and pagination.
 */
const TaskList = ({
  tasks,
  pagination,
  loading,
  selectedId,
  onSelect,
  onPageChange,
  onFilter,
}) => {
  return (
    <section className={styles.section} aria-label="Task list">
      <div className={styles.toolbar}>
        <FilterBar onFilter={onFilter} />
      </div>

      {loading && !tasks.length ? (
        <div className={styles.center}>
          <Spinner size="md" />
        </div>
      ) : !tasks.length ? (
        <div className={styles.center}>
          <div className={styles.emptyIcon}>✅</div>
          <p className={styles.emptyText}>No tasks found</p>
          <p className={styles.hint}>Try clearing the filters or create a new task.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onClick={onSelect}
              isActive={selectedId === task.id}
            />
          ))}
        </div>
      )}

      <Pagination pagination={pagination} onPageChange={onPageChange} />
    </section>
  );
};

export default TaskList;
