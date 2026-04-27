import React from 'react';
import Select from '../../atoms/Select/Select';
import Button from '../../atoms/Button/Button';
import { useAppStore } from '../../../store';
import { TASK_STATUSES, getStatusLabel } from '../../../utils/status';
import styles from './FilterBar.module.css';

/**
 * MOLECULE — FilterBar
 * Filters for assignee and status above the task list.
 */
const FilterBar = ({ onFilter }) => {
  const { persons, filters, setFilter, resetFilters } = useAppStore();
  const hasFilters = filters.personId || filters.status;

  const personOptions = persons.map((p) => ({ value: p.id, label: p.name }));
  const statusOptions = TASK_STATUSES.map((s) => ({ value: s, label: getStatusLabel(s) }));

  const handleChange = (key, value) => {
    setFilter(key, value);
    onFilter?.({ ...filters, [key]: value });
  };

  const handleReset = () => {
    resetFilters();
    onFilter?.({ personId: '', status: '' });
  };

  return (
    <div className={styles.bar}>
      <span className={styles.label}>Filters:</span>
      <Select
        placeholder="All assignees"
        options={personOptions}
        value={filters.personId}
        onChange={(e) => handleChange('personId', e.target.value)}
        className={styles.select}
        aria-label="Filter by assignee"
      />
      <Select
        placeholder="All statuses"
        options={statusOptions}
        value={filters.status}
        onChange={(e) => handleChange('status', e.target.value)}
        className={styles.select}
        aria-label="Filter by status"
      />
      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={handleReset}>
          ✕ Clear
        </Button>
      )}
    </div>
  );
};

export default FilterBar;
