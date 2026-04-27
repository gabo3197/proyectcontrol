import React from 'react';
import Button from '../../atoms/Button/Button';
import styles from './Pagination.module.css';

/**
 * MOLECULE — Pagination
 * Page navigation with prev/next and page number buttons.
 */
const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.totalPages <= 1) return null;
  const { page, totalPages, total, pageSize } = pagination;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visible = pages.filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className={styles.container}>
      <span className={styles.info}>
        Showing <strong>{from}–{to}</strong> of <strong>{total}</strong>
      </span>
      <div className={styles.controls}>
        <Button
          variant="ghost"
          size="sm"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          ←
        </Button>

        {visible.map((p, idx) => (
          <React.Fragment key={p}>
            {idx > 0 && visible[idx - 1] !== p - 1 && (
              <span className={styles.ellipsis}>…</span>
            )}
            <button
              className={`${styles.pageBtn} ${p === page ? styles.active : ''}`}
              onClick={() => onPageChange(p)}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          </React.Fragment>
        ))}

        <Button
          variant="ghost"
          size="sm"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          →
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
