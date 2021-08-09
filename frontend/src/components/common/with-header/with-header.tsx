import Header from 'components/header/header';
import Toolbar from 'components/toolbar/toolbar';
import React from 'react';
import styles from './styles.module.scss';

const WithHeader = (Component: React.FC): React.FC => {
  const componentWithHeader: React.FC = () => {
    return (
      <div className={styles.grid}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.toolbar}>
          <Toolbar />
        </div>
        <div className={styles.content}>
          <Component />
        </div>
      </div>
    );
  };
  return componentWithHeader;
};

export default WithHeader;
