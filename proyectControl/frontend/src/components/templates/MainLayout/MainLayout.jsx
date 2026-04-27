import React from 'react';
import AppHeader from '../../organisms/AppHeader/AppHeader';
import styles from './MainLayout.module.css';

/**
 * TEMPLATE — MainLayout
 * Full-page layout with sticky header and scrollable content area.
 */
const MainLayout = ({ headerActions, children }) => (
  <div className={styles.layout}>
    <AppHeader actions={headerActions} />
    <main className={styles.main} id="main-content">
      {children}
    </main>
  </div>
);

export default MainLayout;
