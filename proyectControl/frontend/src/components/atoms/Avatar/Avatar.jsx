import React from 'react';
import { getInitials } from '../../../utils/status';
import styles from './Avatar.module.css';

const COLORS = ['#3fb950','#58a6ff','#f6a21e','#f85149','#bc8cff','#39c5cf'];

const colorFor = (name = '') => {
  const i = name.charCodeAt(0) % COLORS.length;
  return COLORS[i];
};

/**
 * ATOM — Avatar
 * Shows user initials with a deterministic color, or an image.
 */
const Avatar = ({ name = '', src, size = 'md', className = '' }) => {
  const bg = colorFor(name);
  return (
    <div
      className={`${styles.avatar} ${styles[size]} ${className}`}
      style={!src ? { background: bg } : {}}
      title={name}
      aria-label={name}
    >
      {src ? (
        <img src={src} alt={name} className={styles.img} />
      ) : (
        <span className={styles.initials}>{getInitials(name)}</span>
      )}
    </div>
  );
};

export default Avatar;
