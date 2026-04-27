import React from 'react';
import styles from './Spinner.module.css';

const Spinner = ({ size = 'md', className = '' }) => (
  <div
    className={`${styles.spinner} ${styles[size]} ${className}`}
    role="status"
    aria-label="Loading"
  />
);

export default Spinner;
