import React from 'react';
import styles from './Select.module.css';

/**
 * ATOM — Select
 * Styled native select element.
 */
const Select = ({ label, id, options = [], placeholder, error, className = '', ...props }) => (
  <div className={`${styles.wrapper} ${className}`}>
    {label && <label htmlFor={id} className={styles.label}>{label}</label>}
    <div className={styles.selectWrap}>
      <select id={id} className={`${styles.select} ${error ? styles.hasError : ''}`} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span className={styles.arrow}>▾</span>
    </div>
    {error && <p className={styles.error}>{error}</p>}
  </div>
);

export default Select;
