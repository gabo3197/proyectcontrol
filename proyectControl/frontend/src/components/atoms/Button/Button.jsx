import React from 'react';
import styles from './Button.module.css';

/**
 * ATOM — Button
 * Reusable button with variant, size and loading state.
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => (
  <button
    type={type}
    className={`${styles.btn} ${styles[variant]} ${styles[size]} ${className}`}
    disabled={disabled || loading}
    onClick={onClick}
    {...props}
  >
    {loading && <span className={styles.spinner} aria-hidden="true" />}
    {children}
  </button>
);

export default Button;
