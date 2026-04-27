import React from 'react';
import { getStatusLabel } from '../../../utils/status';
import styles from './Badge.module.css';

/**
 * ATOM — Badge
 * Displays a status pill with semantic color coding.
 */
const Badge = ({ status, size = 'md', className = '' }) => {
  const label = getStatusLabel(status);
  return (
    <span
      className={`${styles.badge} ${styles[status?.replace(' ', '_')]} ${styles[size]} ${className}`}
      aria-label={`Status: ${label}`}
    >
      <span className={styles.dot} />
      {label}
    </span>
  );
};

export default Badge;
