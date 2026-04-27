import React from 'react';
import styles from './Input.module.css';

/**
 * ATOM — Input
 * Controlled text/textarea input with label and error state.
 */
const Input = ({
  label,
  id,
  error,
  type = 'text',
  multiline = false,
  rows = 4,
  className = '',
  ...props
}) => {
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <Tag
        id={id}
        type={multiline ? undefined : type}
        rows={multiline ? rows : undefined}
        className={`${styles.input} ${error ? styles.hasError : ''} ${multiline ? styles.textarea : ''}`}
        {...props}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
