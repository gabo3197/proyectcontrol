import React from "react";
import styles from "./AppHeader.module.css";

/**
 * ORGANISM — AppHeader
 * Top navigation bar with brand and optional actions slot.
 */
const AppHeader = ({ actions }) => (
  <header className={styles.header} role="banner">
    <div className={styles.brand}>
      <div className={styles.logo} aria-hidden="true">
        TF
      </div>
      <div>
        <span className={styles.name}>GaboP</span>
        <span className={styles.tagline}>Happy proyect, Happy life </span>
      </div>
    </div>
    {actions && <div className={styles.actions}>{actions}</div>}
  </header>
);

export default AppHeader;
